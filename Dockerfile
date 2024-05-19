# Gunakan image Node.js resmi sebagai basis
FROM node:18

# Buat direktori kerja di dalam container
WORKDIR /app

# Salin seluruh kode sumber ke dalam container
COPY . .

# Instal dependencies
RUN npm install

# Kompilasi TypeScript menjadi JavaScript
RUN npm build

# Expose port yang digunakan aplikasi (misalnya, 3000)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD [ "node", "dist/app.js" ]
