const discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-BR");
module.exports = {
  name: "sugerir",
  description: "Sugira algo para o nosso servidor!",
  options: [
    {
      name: "ideia",
      description: "Qual ideia",
      type: 3,
      required: true,
    },
  ],
  category: "info",
  run: async (interaction, client) => {
    let ideia = interaction.options.get("ideia").value;
    const embed = new discord.MessageEmbed()
      .setAuthor({
        name: `${interaction.member.user.tag} » Sugestão`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(client.cor)
      .setFooter({ text: `ID do Usuário: ${interaction.member.user.id}` })
      .setThumbnail(
        "https://media3.giphy.com/media/87hciH9fs3wRqmjFMY/giphy.gif"
      )
      .setDescription(
        "💡 **» Sugestão: " +
          ideia +
          "**\n\n:thumbsup: **» Gostei**\n\n:thumbsdown: **» Não Gostei**"
      );

    client.channels.cache
      .get("600289618306400277")
      .send({ embeds: [embed] })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
        interaction.reply({
          content: `Sua sugestão foi enviada com sucesso! [Clique aqui para ver](${msg.url})`,
          ephemeral: true,
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
