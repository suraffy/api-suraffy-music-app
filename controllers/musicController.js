const Music = require("../models/musicModel");

const filter = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.getAllMusic = async (req, res) => {
  try {
    const musics = await Music.find();

    res.status(200).json({ results: musics.length, musics });
  } catch (err) {
    res.status(500).json({ error: "Can not get musics!" });
  }
};

exports.getMusic = async (req, res) => {
  try {
    const _id = req.params.id;

    const music = await Music.findOne({ _id });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(200).json({ music });
  } catch (err) {
    res.status(500).json({ error: "Can not get music!" });
  }
};

exports.updateMusic = async (req, res) => {
  try {
    const _id = req.params.id;

    const allowedFields = ["title", "artist", "genre", "album"];
    const filteredBody = filter(req.body, allowedFields);

    const music = await Music.findOneAndUpdate({ _id }, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(200).json({ music });
  } catch (err) {
    res.status(400).json({ error: "Can not update music!" });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const _id = req.params.id;

    const music = await Music.findOneAndDelete({ _id });
    if (!music) return res.status(404).json({ error: "Music not found!" });

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: "Can not delete music!" });
  }
};
