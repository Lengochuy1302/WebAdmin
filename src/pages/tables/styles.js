import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  input: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(0.8),

    marginTop: theme.spacing(1),
  },
 
  inputText: {
   width: '100%',
    marginTop: 10
  },
  inputText1: {
    width: '100%',
   },
   inputText3: {
    width: '100%',
   },
  image: {
   textAlign: "center",
   border: "1px dashed",
   borderColor: theme.palette.primary.main,
   padding: theme.spacing(0.7),
  },
  inputText2: {
    width: '32.6%',
    marginRight: 6,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputdientich: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(0.8),
    marginTop: theme.spacing(1),
  },
  logotypeText: {
    textAlign: "center"
  }, 
  radio: {
    marginLeft: 1
  }
}));
