import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import {
    Paper,
    Grid,
    Button,
    CssBaseline,
} from '@material-ui/core';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.phone) {
        errors.phone = 'Required';
    }
    if(!values.age){
        errors.age = 'Required';
    }
    return errors;
};

class AddUser extends React.Component {
    onSubmit = ({ firstName, lastName, phone, age,}, { reset, ...props1 }, ...props2) => {
        // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        // window.alert(JSON.stringify(values, 0, 2));
        console.log( props1, props2);
        // reset();
    };

    render() {
        return (
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Form
                    onSubmit={this.onSubmit}
                    validate={validate}
                    render={({ handleSubmit, reset, submitting, pristine }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{ padding: 16 }}>
                                <Grid container alignItems="flex-start" spacing={8}>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            required
                                            name="firstName"
                                            component={TextField}
                                            type="text"
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            required
                                            name="lastName"
                                            component={TextField}
                                            type="text"
                                            label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="phone"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="Phone"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="age"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="number"
                                            label="Age"
                                        />
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={reset}
                                            disabled={submitting || pristine}
                                        >
                                            Reset
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    )}
                />
            </div>
        );
    }


}

export default AddUser;
