import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { View, Text } from 'react-native';
import Grid from '@material-ui/core/Grid';
import LooksOneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import LooksTwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';

export default class CreateTemplateScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titol: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ titol: event.target.value });
    }

    handleSubmit(event) {
        alert('Titol: ' + this.state.titol);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.root}>
                <View style={styles.fons}>
                    <TextField
                        value={this.state.titol}
                        onChange={this.handleChange}
                        id="titol"
                        style={styles.textField}
                        placeholder="Títol de la recepta"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Informació de la recepta"
                    />
                    <View style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'10'}}>
                        <Text>Temps d'elaboració</Text>
                        <TextField style={{ width: '25ch' }} id="temps" label="Ex: 1h 30min" />
                    </View>
                    <View style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'10'}}>
                        <Text>Comensals</Text>
                        <TextField style={{ width: '25ch' }} id="temps" label="Ex: 3 comensals" />
                    </View>
                </View>
                <View style={styles.fons}>
                    <Text style={styles.titol}>Ingredients</Text>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LooksOneRoundedIcon />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Ex: Barreja els ous amb la llet fins..." style={{width: '35ch'}}/>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end" style={{marginTop: 10}}>
                        <Grid item>
                            <LooksTwoRoundedIcon />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Ex: Posa la barreja en un motlle i..." style={{width: '35ch'}}/>
                    </Grid>
                </View>
                <View style={styles.fons}>
                    <Text style={styles.titol}>Passos</Text>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <KitchenRoundedIcon />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Ex: Barreja els ous amb la llet fins..." style={{width: '35ch'}}/>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end" style={{marginTop: 10}}>
                        <Grid item>
                            <KitchenRoundedIcon />
                        </Grid>
                        <TextField id="input-with-icon-grid" label="Ex: Posa la barreja en un motlle i..." style={{width: '35ch'}}/>
                    </Grid>
                </View>
                <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                    <Button variant="contained" style={{alignItems: 'right'}} color="primary" type="submit">
                        Publicar
                    </Button>
                </View>
            </form>
        );
    }
}
