import React from 'react';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: '100vh',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
    tableContainer: {
        width: 500,
        backgroundColor: "#e9ecff",
        margin: theme.spacing(1)
    },
    card: {
        width: 500,
        margin: theme.spacing(1)
    },
    cardHeader: {
        backgroundColor: '#3f51b5',
        color: "white"
    },
    selection: {
        width: '100%'
    }
}));

const Main = ({ChosenBank, banks, Field1, Field2, handleChangeBank, handleChangeField1, handleChangeField2}) => {
    const classes = useStyles();
    return (
        <Paper elevation={4} className={classes.paper}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Banks</TableCell>
                            <TableCell align="right">EUR buy</TableCell>
                            <TableCell align="right">EUR sell</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banks.map((bank) => (
                            <TableRow key={bank.bankName}>
                                <TableCell component="th" scope="row">
                                    {bank.bankName}
                                </TableCell>
                                <TableCell align="right">{bank.EUR.buy}</TableCell>
                                <TableCell align="right">{bank.EUR.sell}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Card className={classes.card}>
                <CardHeader className={classes.cardHeader}
                            title={'Currency Converter'}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label={'Selling'}
                                       variant="outlined"
                                       type={'number'}
                                       value={Field1}
                                       onChange={handleChangeField1}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">AMD</InputAdornment>,
                                       }}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label={'Buying'}
                                       variant="outlined"
                                       type={'number'}
                                       value={Field2}
                                       onChange={handleChangeField2}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">EUR</InputAdornment>,
                                       }}>

                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select variant="outlined" className={classes.selection}
                                    value={ChosenBank}
                                    onChange={handleChangeBank}
                            >
                                {banks.map((bank) => (
                                    <MenuItem key={bank.bankName} value={bank}>{bank.bankName}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    )
};

export default Main;