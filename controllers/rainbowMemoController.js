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

  const getSingleRainbowMemo = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such memo'})
    }
  
    const rainbows = await Rainbow.findById(id)
  
    if (!rainbows) {
      return res.status(404).json({error: "no such memo"})
    }
  
    res.status(200).json(rainbows)
  
  }

  const getLastMemo = async (req, res) => {
    const rainbowsLast = await RainbowMemo.aggregate([
      // created at -1 descending (most recent), limit for # of items
      {
        '$sort': {
          'createdAt': -1
        }
      }, 
      // {
      //   '$limit': 25
      // }
    ])
    res.status(200).json(rainbowsLast)
  }

module.exports = {postRainbowMemo, getSingleRainbowMemo, getLastMemo}