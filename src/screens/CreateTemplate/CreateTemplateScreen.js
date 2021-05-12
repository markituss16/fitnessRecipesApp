import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { View } from 'react-native';

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
                        id="standard-full-width"
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
                </View>
                <Button variant="contained" color="primary" type="submit">
                    Envia
                </Button>
            </form>
        );
    }
}
