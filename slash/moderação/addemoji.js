const discord = require("discord.js");

module.exports = {
  name: "addemoji",
  description: "Insira emojis!",
  permissions: "MANAGE_EMOJIS_AND_STICKERS",
  options: [
    {
      name: "link",
      description: "Qual link de emoji para inserir?",
      type: 3,
      required: true,
    },
    { name: "nome", description: "Nome do emoji a ser inserido?", type: 3, required: true }
  ],
  category: "info",
  run: async (interaction, client) => {
    let link = interaction.options.get("link").value;
    let nome = interaction.options.get("nome").value;
    interaction.guild.emojis.create(link, nome);
    let emb = new discord.MessageEmbed().setAuthor({name: "» Emoji criado com sucesso!", iconURL: link}).setColor(client.cor)
    return interaction.reply({ embeds: [emb]})
  },
};
