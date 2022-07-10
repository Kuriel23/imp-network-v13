const discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-BR");
module.exports = {
  name: "perfil",
  description: "Veja informações de um usuário",
  options: [
    {
      name: "usuário",
      description: "Qual usuário deverá ser abraçado",
      type: 6,
    },
  ],
  category: "info",
  run: async (interaction, client) => {
    let user = interaction.options.getMember("usuário") || interaction.member;

    const userDB = await client.db.Users.findOne({ _id: user.user.id });
    try {
      const userDBnovo = await client.db.Users.findOne({ _id: user.user.id });
    } catch (err) {
      new client.db.Users({ _id: user.user.id }).save();
      return interaction.reply({
        content: "Você agora está registrado no nosso banco de dados!",
      });
    }
    let Criado = moment(user.user.createdAt).format("lll");
    let Entrado = moment(user.joinedTimestamp).format("lll");
    let PrimeirasEmbed = new discord.MessageEmbed()
      .setAuthor({
        name: "Perfil de: " + user.displayName,
        iconURL: "https://i.imgur.com/X49QykE.png",
      })
      .addField(
        "Discord Tag:",
        `${user.displayName}#${user.user.discriminator}`,
        true
      )
      .addField("Discord ID:", user.user.id, true)
      .addField("Conta criada em:", `${Criado}`, true)
      .addField("Conta entrou a:", `${Entrado}`, true)
      .setThumbnail(user.user.displayAvatarURL({ format: "jpg" }))
      .setColor(client.cor);
    interaction.reply({embeds: [PrimeirasEmbed]});
  },
};
