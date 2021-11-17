require("dotenv").config();
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");

const cooldown = new Set();
const wait = require('util').promisify(setTimeout);
const moment = require('moment');

const {
    MessageEmbed,
} = require('discord.js')
const { db } = require("../../../handler/database");


const {
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    name: "config",
    description: "ok",
    type: 1,
    timeout: 43563453443,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    execute: async (client, interaction, args) => {

        const filter = m => m.author.id == interaction.user.id


        
            const embed = new MessageEmbed()
                .setTitle("Where should I log verification data?")
                .setColor("0x2f3136")
                .setDescription("Please mention a log channel")
                .setFooter("To cancel this prompt, say cancel");
            interaction.reply({ embeds: [embed] }).then(() => {
                interaction.channel.awaitMessages({ filter, max: 1 }).then(description => {
                    const guildId = interaction.guild.id

                    let mentionedChannel2 = description.first().mentions.channels.first()
                    const mentionedchannelID = mentionedChannel2.id
                    db.set(`guilds/${guildId}/logsChannel`, `${mentionedchannelID}`)
                    console.log(mentionedchannelID)     

                    
                    const embed = new MessageEmbed()
                    .setTitle("Which role should I role client after their verification?")
                    .setColor("0x2f3136")
                    .setDescription("Please mention a Verified role.")
                    .setFooter("To cancel this prompt, say cancel");
                interaction.channel.send({ embeds: [embed] }).then(() => {
                    interaction.channel.awaitMessages({ filter, max: 1 }).then(amogus => {
                    
    
                        let mentionedreole2 = amogus.first().mentions.roles.first()
                        const mentionedroleID = mentionedreole2.id
                        db.set(`guilds/${guildId}/role`, `${mentionedroleID}`)
                        console.log(mentionedchannelID)     


                        const done = new Discord.MessageEmbed()
                      
                        .setAuthor("Server is now configured!!","https://images-ext-2.discordapp.net/external/g0b1Zhimx-e6a5mv35i5O7HBCIPHVYifgc494UruZYo/https/images-ext-1.discordapp.net/external/QssUDTEm0jgAt5N_Qj8kzzjJcL53gqfbiloopuh7EPY/https/images-ext-2.discordapp.net/external/Euk4_11WeLVghXuYj50jAqZQhOl_AKIQowNnt4S0yeA/https/media.discordapp.net/attachments/539579135786352652/641188971010850816/627171162857930802.png")
                        .setDescription("Server is now configured! clients can now Verify their respective accounts.")
                        .setTimestamp()
                        .setColor("#2f3136")
                        interaction.channel.send({embeds: [done]})
                    
                    })

                })

                })

            })
       

          



            


    },
};