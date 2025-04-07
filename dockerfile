FROM node:20

ARG USER_NAME=app
ARG USER_ID=${WORKDIR}

# 引数の定義
ARG PROFILE
ARG TOKEN
ARG CLAUDE_API_KEY
ARG CLIENT_ID
ARG CHANNEL_ID_1
ARG CHANNEL_ID_2
ARG SPECIAL_CHANNEL_ID_1
ARG SPECIAL_CHANNEL_ID_2
ARG SYSTEM_PLAN
ARG SPECIAL_SYSTEM_PLAN
ARG SPECIAL_SYSTEM_PLAN_CHANNEL_ID
ARG SP_MODEL
ARG NL_MODEL
ARG VERIFY_ROLE_ID
ARG EMAIL_USER
ARG EMAIL_PASS
ARG INVITE_LINK

# 環境変数として設定
ENV PROFILE=${PROFILE}
ENV TOKEN=${TOKEN}
ENV CLAUDE_API_KEY=${CLAUDE_API_KEY}
ENV CLIENT_ID=${CLIENT_ID}
ENV CHANNEL_ID_1=${CHANNEL_ID_1}
ENV CHANNEL_ID_2=${CHANNEL_ID_2}
ENV SPECIAL_CHANNEL_ID_1=${SPECIAL_CHANNEL_ID_1}
ENV SPECIAL_CHANNEL_ID_2=${SPECIAL_CHANNEL_ID_2}
ENV SYSTEM_PLAN=${SYSTEM_PLAN}
ENV SPECIAL_SYSTEM_PLAN=${SPECIAL_SYSTEM_PLAN}
ENV SPECIAL_SYSTEM_PLAN_CHANNEL_ID=${SPECIAL_SYSTEM_PLAN_CHANNEL_ID}
ENV SP_MODEL=${SP_MODEL}
ENV NL_MODEL=${NL_MODEL}
ENV VERIFY_ROLE_ID=${VERIFY_ROLE_ID}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}
ENV INVITE_LINK=${INVITE_LINK}

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["node", "index.js"]