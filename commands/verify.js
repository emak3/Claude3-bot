const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const log = require("../logger.js");
const { getConfig } = require('../config.js');
module.exports = {
    command: new SlashCommandBuilder()
            .setName("verify")
            .setDescription("verify key gen (管理者コマンド)")
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setContexts(InteractionContextType.Guild),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const confirm = new ButtonBuilder()
            .setCustomId('mailad')
            .setLabel('認証コードを取得')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Success);
        const cancel = new ButtonBuilder()
            .setCustomId('vcode')
            .setLabel('認証コードを入力')
            .setEmoji('📝')
            .setStyle(ButtonStyle.Secondary);
        const member = new ButtonBuilder()
            .setCustomId('member')
            .setLabel('在籍簿')
            .setEmoji('📖')
            .setStyle(ButtonStyle.Primary);
        const buttons = new ActionRowBuilder()
            .addComponents(confirm, cancel, member);
        await interaction.reply({ content: `【 ${getConfig().EMAIL_USER} 】から認証コードが届きます。\n> 🔗 [招待URL](${getConfig().inviteLink})`, components: [buttons] });
    }
}