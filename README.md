# 📦 Discord Image Compressor Bot

A simple yet powerful Discord bot that compresses images on the fly! Just drop an image in any channel, and the bot will return a compressed version of it — saving space and preserving quality.

## ✨ Features

- 🔧 Compresses JPEG images with `sharp`
- ⚡ Fast and lightweight
- 🤖 Built using `discord.js`
- 📥 Deletes the image after sending to keep things clean

## 📷 How It Works

1. A user uploads an image in a Discord channel.
2. The bot listens for attachments.
3. It compresses the image using `sharp` with a quality of 60%.
4. Sends the optimized image back in the channel.
5. Deletes the file from the server to save space.

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/discord-image-compressor-bot.git
cd discord-image-compressor-bot
