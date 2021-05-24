import mongoose from 'mongoose'

const MapSchema = new mongoose.Schema({
  mapId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

export const Map = mongoose.model('Map', MapSchema)
