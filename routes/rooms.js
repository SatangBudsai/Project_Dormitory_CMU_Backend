const express = require("express");
const data = require("../data/dormitory");

const router = express.Router();

router.post("/:id", (req, res) => {
  const dormitoryId = Number.parseInt(req.params.id);
  const dataDormitoryID = data.find(
    (dormitory) => dormitory.id === dormitoryId
  );

  let currentRoomId = dataDormitoryID.rooms.length;

  const { floor, roomNo, numMax } = req.body;
  const room = {
    id: ++currentRoomId,
    floor,
    roomNo,
    numMax,
    numStudent: 0,
  };

  dataDormitoryID.rooms.push(room);
  res.json(dataDormitoryID);
});

router.put("/:id/:idRoom", (req, res) => {
  const { floor, roomNo, numMax, numStudent } = req.body;

  const dormitoryId = Number.parseInt(req.params.id);
  const dormitory = data.find((dormitory) => dormitory.id === dormitoryId);

  const roomId = Number.parseInt(req.params.idRoom);
  const room = dormitory.rooms.find((room) => room.id === roomId);

  room.floor = floor;
  room.roomNo = roomNo;
  room.numMax = numMax;
  room.numStudent = numStudent;

  res.json(room);
});
// const filters = req.query;

router.put("/:id", (req, res) => {
  const numRoom = req.query;
  const { floor, roomNo, numMax } = req.body;

  const dormitoryId = Number.parseInt(req.params.id);
  const dormitory = data.find((dormitory) => dormitory.id === dormitoryId);

  const room = dormitory.rooms.find((room) => room.roomNo == numRoom.roomNo);

  room.roomNo = roomNo;
  room.numMax = numMax;

  res.json(room);
});

router.delete("/:id", (req, res) => {
  try {
    const numRoom = req.query;

    const dormitoryId = Number.parseInt(req.params.id);
    const dormitory = data.find((dormitory) => dormitory.id === dormitoryId);

    const roomIndex = dormitory.rooms.findIndex(
      (room) => room.roomNo == numRoom.roomNo
    );

    dormitory.rooms.splice(roomIndex, 1);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
