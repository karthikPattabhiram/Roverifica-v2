require("dotenv").config();
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const fetch = require('node-fetch');


const wait = require('util').promisify(setTimeout);
const moment = require('moment');

module.exports = {
    name: "userprofile",
    type: 2, // 2 = User Apps, 3 = Message Apps

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
    execute: async (client, interaction, args) => {
        
        const target = interaction.member.guild.members.cache.get(interaction.targetId);


        fetch(`https://api.blox.link/v1/user/${interaction.targetId}`).then(res => res.json()).then(async (response) => {


            if (response.status === "error") {

                const errorembed = new Discord.MessageEmbed()
                .setAuthor("Oops an error occured", "https://cdn.discordapp.com/emojis/750578151028949032.png?size=96")
                .setColor("#2f3136")
                .setDescription(`No Data found. :(`)
                interaction.reply({embeds: [errorembed]})
                
            }
            if (response.status === "ok") {
                const RBXuserID = response.primaryAccount


                fetch(`https://users.roblox.com/v1/users/${RBXuserID}`).then(r => r.json()).then(async (response) => {
                    const username = response.displayName
                    const description = response.description
                    const createdate = response.created
                 const embed = new Discord.MessageEmbed()
                 .setTitle('Profile')
                 .addField('Display name', username)
                 .addField('description', description)
                 .addField('created at ', createdate)
                 .setColor('#2f3136')
                 .setThumbnail("https://www.roblox.com/headshot-thumbnail/image?userId=" + RBXuserID + "&width=420&height=420&format=png")
                 interaction.reply({embeds: [embed]})


                })
            }
        })
        
        
    },
};