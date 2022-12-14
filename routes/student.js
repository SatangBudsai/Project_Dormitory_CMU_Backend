const express = require("express");
const data = require("../data/student");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", (req, res) => {
  const studentId = Number.parseInt(req.params.id);
  const student = data.find((student) => student.id === studentId);
  res.json(student);
});

let currentStudentId = 2;
router.post("/", (req, res) => {
  const { username, password, name, imageURL, faculty, major, reserve } =
    req.body;
  const student = {
    id: ++currentStudentId,
    username,
    password,
    name,
    imageURL,
    faculty,
    major,
    reserve: {
      statusReserve: reserve.statusReserve,
      buildingNo: reserve.buildingNo,
      roomNo: reserve.roomNo,
    },
  };
  data.push(student);
  res.json(student);
});

router.put("/:id", (req, res) => {
  const { statusReserve, roomID, buildingNo, roomNo } = req.body;
  const studentId = Number.parseInt(req.params.id);
  const student = data.find((student) => student.id === studentId);

  student.statusReserve = statusReserve;
  student.roomID = roomID;
  student.buildingNo = buildingNo;
  student.roomNo = roomNo;

  res.json(student);
});

router.delete("/:id", (req, res) => {
  try {
    const studentId = Number.parseInt(req.params.id);
    const studentIndex = data.findIndex((student) => student.id === studentId);
    data.splice(studentIndex, 1);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
});

// const x = data.find(item => item.id === 4)
// const y = {
//   ...x,
//   rooms : [
//     ...x.rooms,
//      { id: 10, floor:4, roomNo: '404', numMax:2, numStudent:0},
//   ]
//   ...x,
//   room : [
//     ...x.rooms.filter(item => item.id !== 7)
//   ]
// }

module.exports = router;
