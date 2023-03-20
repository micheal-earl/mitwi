FROM denoland/deno:1.25.0

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .
RUN deno cache main.ts --unstable --import-map=import_map.json

EXPOSE 8000

CMD ["run", "-A", "--unstable", "main.ts"]