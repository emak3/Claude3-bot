const { InteractionType, MessageFlags } = require("discord.js");
const { sendVerificationEmail } = require('../../email/mailer.js');
const { getConfig } = require('../../config.js');
const nodemailer = require('nodemailer');
const log = require("../../logger.js");
const pendingVerifications = new Map();
/**
 * @param {ModalSubmitInteraction} interaction
 */
module.exports = async function (interaction) {
    if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'emailModal') {
            const email = interaction.fields.getTextInputValue('email');
            // 正規表現: sで始まり、5桁の数字、@s.salesio-sp.ac.jp で終わる
            const emailPattern = /^s\d{5}@s\.salesio-sp\.ac\.jp$/;

            if (!emailPattern.test(email)) {
                await interaction.reply({
                    content: '正しい形式の学内メールアドレスを入力してください（例: `s23300@s.salesio-sp.ac.jp` ）',
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            log.info(email)
            const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6桁コード
            pendingVerifications.set(interaction.user.id, { email, code });

            try {
                await sendVerificationEmail(email, code);
                await interaction.reply({ content: `認証コードを **${email}** に送信しました！\n迷惑メールフォルダーに入っている場合があります。`, flags: MessageFlags.Ephemeral });
            } catch (err) {
                console.error(err);
                await interaction.reply({ content: 'メール送信に失敗しました。', flags: MessageFlags.Ephemeral });
            }
        }

        if (interaction.customId === 'codeModal') {
            const inputCode = interaction.fields.getTextInputValue('code');
            const data = pendingVerifications.get(interaction.user.id);

            if (!data) {
                return interaction.reply({ content: '認証情報が見つかりません。もう一度やり直してください。', flags: MessageFlags.Ephemeral });
            }

            if (inputCode === data.code) {
                const role = interaction.guild.roles.cache.find(r => r.id === getConfig().verifyRoleId);
                if (!role) {
                    return interaction.reply({ content: 'ロールが見つかりません。管理者に連絡してください。', flags: MessageFlags.Ephemeral });
                }

                const member = await interaction.guild.members.fetch(interaction.user.id);
                await member.roles.add(role);

                pendingVerifications.delete(interaction.user.id);
                await interaction.reply({ content: '認証成功！ロールを付与しました。', flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: '認証コードが一致しません。', flags: MessageFlags.Ephemeral });
            }
        }
    }
}