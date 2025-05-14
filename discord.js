// src/bot.js

import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const BOT_TOKEN = process.env.TOKEN;

async function compressImage(imageUrl, saveAs) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        await sharp(response.data)
            .jpeg({ quality: 60 })
            .toFile(saveAs);

        return saveAs;
    } catch (err) {
        console.error('Error compressing image:', err.message);
        return null;
    }
}

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const attachment = message.attachments.first();
    if (!attachment) return;

    const imageUrl = attachment.url;
    const fileName = `compressed_${Date.now()}.jpg`;
    const uploadsDir = path.join(__dirname, 'uploads');

 
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    const filePath = path.join(uploadsDir, fileName);
    const result = await compressImage(imageUrl, filePath);

    if (result) {
        await message.channel.send({
            content: 'Here is your compressed image:',
            files: [result]
        });
        fs.unlinkSync(result);  
    } else {
        await message.reply('Failed to compress the image.');
    }
});

client.login(BOT_TOKEN);
