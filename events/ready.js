module.exports = async (client) => {
  client.user.setActivity(`Envie DM para suporte`, {
    type: "WATCHING",
  });
  let activities = [
    `Prefixo: /`,
    `imperionetwork.ml`,
    `www.imperionetwork.ml`
	],
		i = 0;
  setInterval(() => {
    client.user.setActivity(activities[i++ % activities.length], {
      type: "WATCHING",
    });
  }, 15000);
  client.logger.log(`> ✅ • Carregado com sucesso [DISCORD]`, "success")
};
