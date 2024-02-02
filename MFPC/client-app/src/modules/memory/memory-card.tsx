import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Memory } from "../../interfaces/Models";
import {
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Moment from "moment";
import { MemoryContext } from "./memory-store.tsx";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

interface Props {
  memory: Memory;
}

const MemoryCard = observer((props: Props) => {
  const { memory } = props;
  const memoryStore = useContext(MemoryContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleFavourite = () => {
    memoryStore
      .toggleFavourite(memory.id)
      .then(() => memoryStore.getMemories());
  };

  const deleteMemory = () => {
    console.log("delete");
    memoryStore.deleteMemory(memory.id).then(() => {
      memoryStore.getMemories();
      setOpen(false);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    memoryStore.selectMemory(memory.id).then(() => navigate(`/update/${memory.id}`));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require("..//..//images//image.jpg")}
          alt="memory"
          onClick={handleUpdate}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {Moment(memory.date).format("DD MMM YYYY")}
            <DeleteOutlineIcon onClick={handleClickOpen} />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this memory?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You will not be able to get back this memory. Please pay
                  attention before confirming.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteMemory} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ overflow: "hidden", height: "20px" }}
          >
            {memory.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={toggleFavourite}
          style={{ width: "100%" }}
        >
          {memory.favourite === true ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Remove from favourites <StarIcon />
            </div>
          ) : (
            "Add to favourite"
          )}
        </Button>
      </CardActions>
    </Card>
  );
});

export default MemoryCard;
