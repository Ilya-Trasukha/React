import React from "react";
import IceandfireApi from "../../servises/iceandfire";
import { Characters } from "../../types/characters";
import "./style.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type TProps = any;
type TState = {
  characters: [] | Characters[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
  open: boolean;
  setOpen: boolean;
};
export default class character extends React.Component<TProps, TState> {
  state = {
    characters: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 20,
    open: false,
    setOpen: true
  };
  

  getCharacters = () => {
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true });
    IceandfireApi.getCharacters(page, pageSize)
      .then((res: Characters[]) => {
        this.setState({ characters: res, isLoading: false });
      })
      .catch((e: any) => {
        this.setState({ isLoading: false, isError: true });
      });
  };
  componentDidMount() {
    this.getCharacters();
  }

  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
    this.getCharacters();
  };
  componentDidUpdate() {
    console.log("componentDidUpdate");
  };

  render() {
    console.log(this.state);
    const { characters, isLoading, isError } = this.state;
    const { open, setOpen } = this.state;
    const handleOpen = () =>  this.setState({ setOpen: true, open: true});
    const handleClose = () =>  this.setState({ setOpen: false, open: false});

    return (
      <div className="characters">
        {isError && "Error"}
        {isLoading && "Loading"}
        {characters &&
          !isError &&
          !isLoading &&
          this.state.characters.map((el: Characters) => (
            <Button key={el.url}>
              <div>
                <div onClick={handleOpen}> {el.name} </div>  
                  <Modal
                     open={open}onClose={handleClose}aria-labelledby="modal-modal-title"aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>Name: {el.name}</div> 
                        <div>Gender: {el.gender}</div>
                        <div>Culture: {el.culture}</div>
                        <div>Born: {el.born}</div>
                        <div>Died: {el.died}</div>
                        <div>Titles: {el.titles}</div>
                        <div>Played by: {el.playedBy}</div>                      
                      </Typography>
                    </Box>
                  </Modal>
              </div>
            </Button>
          ))}
        {characters && !isError && (
          <div className="characters-nav">
            <Button variant="outlined"
              disabled={this.state.page === 1}
              onClick={(_e: any) => this.handlerPage("left")}
            >
              left
            </Button>
            <Button variant="outlined" 
              onClick={(_e: any) => this.handlerPage("right")}>
              right
            </Button>
          </div>
        )}
      </div>
    );
  }
}