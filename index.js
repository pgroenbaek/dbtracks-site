const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  const redirects = [
    { prefix: '/dl_files/dbt/', target: '/pages/DownloadDBTracks.html' },
    { prefix: '/dl_files/dbx/', target: '/pages/DownloadDBTracks2.html' },
    { prefix: '/dl_files/usx/', target: '/pages/DownloadUSTracks.html' },
    { prefix: '/dl_files/bab/', target: '/pages/DownloadBAB.html' },
    { prefix: '/dl_files/zub/', target: '/pages/DownloadAccessories.html' },
    { prefix: '/index', target: '/index.html' }
  ];

  const match = redirects.find(r => req.path.startsWith(r.prefix));
  if (match) {
    return res.redirect(302, match.target);
  }

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});