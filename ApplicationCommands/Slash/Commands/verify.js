require("dotenv").config();
const { db } = require("../../../handler/database");
const {
    Client,
    CommandInteraction
} = require("discord.js");
const Discord = require("discord.js");
const fetch = require('node-fetch');

const {
    MessageActionRow,
    MessageButton
} = require('discord.js');

const wait = require('util').promisify(setTimeout);
const moment = require('moment');

module.exports = {
    name: "verify",
    description: "Verify yourself using bloxlink.",
    type: 1,
    timeout: 5000,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    execute: async (client, interaction, message, args) => {





        const embed = new Discord.MessageEmbed()
            .setTitle('Which verification service should we use to verify your account?')
            .setDescription("Should we use Rover or Bloxlink to verify your account?")
            .setColor("#2f3136")
            .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')          
            .setFooter("Choose any button to continue.")



        const buttonsrow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('SUCCESS')

                    .setLabel('Bloxlink')
                    .setCustomId("ds"),

                new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('Rover')
                    .setCustomId('us'),
                new MessageButton()
                    .setStyle('DANGER')
                    .setCustomId("cancel")
                    .setLabel('cancel'))


        interaction.reply({
            embeds: [embed],
            components: [buttonsrow],
            ephemeral: false
        }).then(msg => {


            const amoguscollector = interaction.channel.createMessageComponentCollector({
                filter: interaction => (interaction.isButton()),
            })
            amoguscollector.on("collect", async (i) => {

                if (i.customId == "ds") {


                    const usertag = interaction.user.id
                    fetch(`https://api.blox.link/v1/user/${usertag}`).then(r => r.json()).then(async (res) => {
                        if (res.status === "error") {

                            const errorembed = new Discord.MessageEmbed()
                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                            .setColor("#2f3136")
                            .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')          
                            .setDescription(`No Data found. :(`)
                            interaction.reply({embeds: [errorembed]})
                        }
                        if (res.status === "ok") {




                            const embed1 = new Discord.MessageEmbed()
                                .setTitle('Which verification service should we use to verify your account?')
                                .setDescription("Should we use Rover or Bloxlink to verify your account?")
                                .setColor("#2f3136")
                                .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')          
                                .setFooter("Choose any button to continue.")



                            const buttonsrow = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setStyle('SUCCESS')
                                        .setDisabled(true)
                                        .setLabel('Bloxlink')
                                        .setCustomId("ds"),

                                    new MessageButton()
                                        .setDisabled(true)
                                        .setStyle('SUCCESS')
                                        .setLabel('Rover')
                                        .setCustomId('us'),
                                    new MessageButton()
                                        .setDisabled(true)
                                        .setStyle('DANGER')
                                        .setCustomId("cancel")
                                        .setLabel('cancel'))

                                        interaction.editReply({ embeds: [embed1], components: [buttonsrow] })

                                        const guildId = interaction.guild.id
                            console.log("yes!!")
                            const role = await  db.get(`guilds.${guildId}.role`)
                            console.log(role)
                            const verifiedrole = interaction.guild.roles.cache.get(role)
                           
                            if (!verifiedrole) {
                                return i.followUp({
                                    content: `There's no role verification role in the server, which means I can't role you.`
                                })

                            }
                            const RBXuserID = res.primaryAccount


                            fetch(`https://users.roblox.com/v1/users/${RBXuserID}`).then(r => r.json()).then(async (res) => {

                                const username = res.displayName

                                // await i.member.setNickname(`${username}`)
                                await i.member.roles.add(verifiedrole)

                                const embed = new Discord.MessageEmbed()
                                    .setTitle("Welcome!")
                                    .setDescription("Your are now verified!")
                                    .setThumbnail('https://cdn.discordapp.com/attachments/765942523003797534/910437736194920458/unknown.png')
                                    .setTimestamp()
                                    .setColor("#2f3136")
                                    .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')          
                                    i.reply({
                                    embeds: [embed]
                                })

                                const channel = await  db.get(`guilds.${guildId}.logsChannel`)
                                const mentionedChannel2 = interaction.guild.channels.cache.get(channel)
                              
                                let logembed = new Discord.MessageEmbed()
                                .setColor(0x2f3136)
                                .setTitle("Uhh, A user just verified")
                                .addField("User", interaction.user.username)
                                .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')
                                .addField("User ID", interaction.user.id)
                                .addField("Roblox Username", username)
                                .addField("Roblox ID", RBXuserID)
                                .setThumbnail("https://www.roblox.com/headshot-thumbnail/image?userId=" + RBXuserID + "&width=420&height=420&format=png")
                                mentionedChannel2.send({embeds: [logembed]})

                            })
                        }
                    })


                } if (i.customId == "us") {

                    const usertag = interaction.user.id
                    fetch(`https://verify.eryn.io/api/user/${usertag}`).then(r => r.json()).then(async (res) => {
                        if (res.status === "error") {

                            const errorembed = new Discord.MessageEmbed()
                            .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                            .setColor("#2f3136")
                            .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')
                            .setDescription(`No Data found. :(`)
                            interaction.reply({embeds: [errorembed]})

                        }
                        if (res.status === "ok") {
                            console.log("yes!!")


                            const embed1 = new Discord.MessageEmbed()
                                .setTitle('WHich verification service should we use to verify your account?')
                                .setDescription("Should we use Rover or Bloxlink to verify your account?")
                                .setColor("#2f3136")
                                .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')
                                .setFooter("Choose any button to continue.")



                            const buttonsrow = new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                        .setStyle('SUCCESS')
                                        .setDisabled(true)
                                        .setLabel('Bloxlink')
                                        .setCustomId("ds"),

                                    new MessageButton()
                                        .setDisabled(true)
                                        .setStyle('SUCCESS')
                                        .setLabel('Rover')
                                        .setCustomId('us'),
                                    new MessageButton()
                                        .setDisabled(true)
                                        .setStyle('DANGER')
                                        .setCustomId("cancel")
                                        .setLabel('cancel'))

                                        interaction.editReply({ embeds: [embed1], components: [buttonsrow] })
                                        const guildId = interaction.guild.id

                                        console.log("yes!!")
                                        const role = await  db.get(`guilds.${guildId}.role`)
                                        console.log(role)
                                        const verifiedrole = interaction.guild.roles.cache.get(role)

                   
                            if (!verifiedrole) {
                                return interaction.followUp({
                                    content: `There's no role verification role in the server, which means I can't role you.`
                                })

                            }
                            const RBXuserID = res.robloxId


                            fetch(`https://users.roblox.com/v1/users/${RBXuserID}`).then(r => r.json()).then(async (res) => {

                                const username = res.displayName

                                // await i.member.setNickname(`${username}`)

                                await i.member.roles.add(verifiedrole)

                                const embed = new Discord.MessageEmbed()
                                    .setTitle("Welcome!")
                                    
                                    .setDescription("Your are now verified!")
                                    .setThumbnail('https://cdn.discordapp.com/attachments/765942523003797534/910437736194920458/unknown.png')
                                    .setTimestamp()
                                    .setColor("#2f3136")
                                    .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')   
                                    i.reply({
                                    embeds: [embed]
                                    
                                })
                                const channel = await  db.get(`guilds.${guildId}.logsChannel`)
                                const mentionedChannel2 = interaction.guild.channels.cache.get(channel)
                              
                                let logembed = new Discord.MessageEmbed()
                                .setColor(0x2f3136)
                                .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')
                                .setTitle("Uhh, A user just verified")
                                .addField("User", `${interaction.user.username}`)
                                .addField("User ID", `${interaction.user.id}`)
                                .addField("Roblox Username", `${username}`)
                                .addField("Roblox ID", `${RBXuserID}`)
                                .setThumbnail("https://www.roblox.com/headshot-thumbnail/image?userId=" + RBXuserID + "&width=420&height=420&format=png")
                                mentionedChannel2.send({embeds: [logembed]})
                            

                            })





                        }

                    })


                } if (i.customId == "cancel") {

                    
                      

                         


                    const embed1 = new Discord.MessageEmbed()
                        .setTitle('WHich verification service should we use to verify your account?')
                        .setDescription("Should we use Rover or Bloxlink to verify your account?")
                        .setColor("#2f3136")
                        .setFooter("Choose any button to continue.")
                        .setImage('https://cdn.discordapp.com/attachments/765942523003797534/910438455870373898/unknown.png')


                    const buttonsrow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle('SUCCESS')
                                .setDisabled(true)
                                .setLabel('Bloxlink')
                                .setCustomId("ds"),

                            new MessageButton()
                                .setDisabled(true)
                                .setStyle('SUCCESS')
                                .setLabel('Rover')
                                .setCustomId('us'),
                            new MessageButton()
                                .setDisabled(true)
                                .setStyle('DANGER')
                                .setCustomId("cancel")
                                .setLabel('cancel'))

                                interaction.editReply({ embeds: [embed1], components: [buttonsrow] })
                            
                                i.reply({content: 'Cancelled prompt.'})
                            
                            
                        
                    }


            })
        })





    },
};