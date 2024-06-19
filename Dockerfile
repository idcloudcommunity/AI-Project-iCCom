# Gunakan image Node.js sebagai dasar a

FROM node:18

# Set folder kerja di dalam container
WORKDIR /app

# Salin seluruh kode aplikasi ke folder kerja di dalam container
COPY . .

# Install dependensi npm
RUN npm install

# Port yang akan diexpose oleh container
EXPOSE 7777

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
