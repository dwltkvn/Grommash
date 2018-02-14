import React from "react";
import PropTypes from "prop-types";

import Card from "grommet/components/Card";
import Form from "grommet/components/Form";
import Select from "grommet/components/Select";
import Animate from "grommet/components/Animate";

import Button from "grommet/components/Button";
import Paragraph from "grommet/components/Paragraph";
import Value from "grommet/components/Value";
import Box from "grommet/components/Box";
import CheckBox from "grommet/components/CheckBox";
import Label from "grommet/components/Label";
import FormField from "grommet/components/FormField";
import TextInput from "grommet/components/TextInput";
import Status from "grommet/components/icons/Status";

// http://react-day-picker.js.org/docs/getting-started/
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import moment from "moment";

import TimeSelectionComponent from "./timeSelectionComponent";

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];
const WEEKDAYS_LONG = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];
const WEEKDAYS_SHORT = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

class ReservationCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTimeClick = this.handleTimeClick.bind(this);
    this.onAlreadyClient = this.onAlreadyClient.bind(this);

    this.openLayer = this.openLayer.bind(this);
    this.onLayerClosed = this.onLayerClosed.bind(this);

    // Init React States
    let disabledDate = [];
    // disable a specific date
    //disabledDate.push(new Date(2018, 2, 6));
    // disable sunday
    disabledDate.push({ daysOfWeek: [0] });
    // disable date before today
    disabledDate.push({ before: new Date() });

    this.state = {
      stateDateSelected: this.props.propsDateSelected,
      stateTimeSelected: undefined,
      stateDisabledDate: disabledDate,
      stateAlreadyClient: false,
      stateTimeSelectionLayer: false
    };

    this.currentMonth = new Date();
  }

  onAlreadyClient(event) {
    //    console.log(event.target.checked);
    this.setState({ stateAlreadyClient: event.target.checked });

    //  console.log(this.state.stateAlreadyClient);
  }

  openLayer() {
    this.setState({ stateTimeSelectionLayer: true });
    console.log("open layer");
  }

  onLayerClosed() {
    this.setState({ stateTimeSelectionLayer: false });
  }

  buttonTxt = () => `Réserver le ${moment(this.state.stateDateSelected).format(
    "DD/MM/YYYY"
  )} 
                     à ${moment(this.state.stateTimeSelected, ["H:m"]).format(
                       "HH:mm"
                     )}`;

  handleDayClick(day, { selected, disabled }) {
    if (disabled) return;

    if (selected) {
      this.setState({ stateDateSelected: undefined });
    } else {
      this.setState({ stateDateSelected: day });
    }
    this.setState({ stateTimeSelected: undefined });
  }

  handleTimeClick(time) {
    this.setState({ stateTimeSelected: time.value });
  }

  render() {
    return (
      <Form>
        <Card
          heading="Réserver une séance"
          description="Choisir une date et un crénau horaire."
          contentPad="none"
        >
          <Box separator="all" colorIndex="light-1" margin="small">
            <Box pad="small" direction="row">
              <CheckBox
                label="Déjà client(e) ?"
                toggle={true}
                onChange={e => this.onAlreadyClient(e)}
              />
              {this.state.stateAlreadyClient ? <Status value="ok" /> : null}
            </Box>
            {this.state.stateAlreadyClient ? (
              <Animate enter={{ animation: "fade", duration: 500, delay: 0 }}>
                <Box pad="small">
                  <FormField label="Couriel">
                    <TextInput />
                  </FormField>
                  <Label>OU</Label>
                  <FormField label="Téléphone">
                    <TextInput />
                  </FormField>
                </Box>
              </Animate>
            ) : (
              <Box />
            )}
          </Box>
          <Box separator="all" colorIndex="light-1" margin="small">
            <DayPicker
              locale="fr"
              months={MONTHS}
              weekdaysLong={WEEKDAYS_LONG}
              weekdaysShort={WEEKDAYS_SHORT}
              firstDayOfWeek={1}
              disabledDays={this.state.stateDisabledDate}
              fromMonth={this.currentMonth}
              onDayClick={this.handleDayClick}
              selectedDays={this.state.stateDateSelected}
            />

            {this.state.stateDateSelected ? (
              <Animate enter={{ animation: "fade", duration: 500, delay: 0 }}>
                <Box direction="row" align="center" margin="small">
                  <Value value="8" size="small" />
                  <Paragraph>
                    {" "}
                    Horaires disponibles le{" "}
                    {moment(this.state.stateDateSelected).format("DD/MM/YYYY")}:
                  </Paragraph>
                </Box>

                <Box pad={{ horizontal: "large" }} margin={{ bottom: "small" }}>
                  <Select
                    placeHolder={this.state.stateTimeSelected}
                    options={[
                      "09h00",
                      "10h00",
                      "11h00",
                      "12h00",
                      "13h00",
                      "14h00",
                      "15h00",
                      "16h00"
                    ]}
                    value={this.state.stateTimeSelected}
                    onChange={this.handleTimeClick}
                    margin="small"
                  />
                </Box>
              </Animate>
            ) : (
              <Paragraph>Choisir le jour de la séance</Paragraph>
            )}
          </Box>

          {this.state.stateAlreadyClient &&
          this.state.stateDateSelected &&
          this.state.stateTimeSelected ? (
            <Box margin="small">
              <FormField label="Une question? Une précision? Dites nous tout ...">
                <TextInput />
              </FormField>
            </Box>
          ) : (
            <Box />
          )}
          {this.state.stateDateSelected && this.state.stateTimeSelected ? (
            <Animate enter={{ animation: "fade", duration: 500, delay: 0 }}>
              <Box
                align="center"
                pad={{ horizontal: "small", vertical: "small" }}
              >
                <Button label={this.buttonTxt()} type="submit" primary={true} />
              </Box>
            </Animate>
          ) : (
            <div />
          )}
        </Card>
        <Button
          label="Layer"
          type="button"
          primary={true}
          onClick={this.openLayer}
        />
        {this.state.stateTimeSelectionLayer ? (
          <TimeSelectionComponent propCbLayerClosed={this.onLayerClosed} />
        ) : null}
      </Form>
    );
  }
}

ReservationCard.propTypes = {
  //classes: PropTypes.object.isRequired
};

export default ReservationCard;
