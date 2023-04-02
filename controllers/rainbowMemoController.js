const mongoose = require('mongoose')
const RainbowMemo = require('../models/rainbowMemoModel')

const postRainbowMemo = async (req, res) => {
    const {memo} = req.body
  
    try {
      const rainbow = await RainbowMemo.create({memo})
      res.status(200).json(rainbow)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports = {postRainbowMemo}