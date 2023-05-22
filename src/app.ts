import {
  Choice,
  ChoiceSetInput,
  DoistCard,
  SubmitAction,
  TextInput,
} from "@doist/ui-extensions-core";
import express, { Request, Response, NextFunction } from "express";

const port = 3000;
const app = express();
app.use(express.json());

const processPing = async function (
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  response.send("pong");
};

const processRequest = async function (
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const card = new DoistCard();

  const itemNameInput = new TextInput();
  itemNameInput.id = "Input.Text";
  itemNameInput.isRequired = true;
  itemNameInput.label = "Item name";
  itemNameInput.placeholder = "Enter item name";

  const itemDescInput = new TextInput();
  itemDescInput.id = "Input.Text";
  itemDescInput.label = "Item description";
  itemDescInput.placeholder = "Enter description";
  itemDescInput.isMultiline = true;
  itemDescInput.rows = 2;

  const itemMaxInput = new TextInput();
  itemMaxInput.id = "Input.Text";
  itemMaxInput.isRequired = true;
  itemMaxInput.label = "Max amount";
  itemMaxInput.placeholder = "Max amount of the item";
  itemMaxInput.separator = true;
  itemMaxInput.spacing = "extraLarge";
  itemMaxInput.regex = "^[0-9]+$";

  const itemFrequencyChoice = new ChoiceSetInput();
  itemFrequencyChoice.id = "Input.Choice";
  itemFrequencyChoice.isRequired = true;
  itemFrequencyChoice.label = "Frequency";
  itemFrequencyChoice.choices = [
    new Choice("Every 6h"),
    new Choice("Every 12h"),
    new Choice("Daily"),
    new Choice("Weekly"),
  ];
  itemFrequencyChoice.defaultValue = "Daily";

  const projectChoice = new ChoiceSetInput();
  projectChoice.id = "Input.Choice";
  projectChoice.isRequired = true;
  projectChoice.label = "Save item to:";
  projectChoice.choices = [
    new Choice("Inbox"),
    new Choice("Project 1"),
    new Choice("Project 2"),
    new Choice("Project 3"),
  ];
  projectChoice.defaultValue = "Inbox";
  projectChoice.separator = true;
  projectChoice.spacing = "extraLarge";

  card.addItem(itemNameInput);
  card.addItem(itemDescInput);
  card.addItem(itemMaxInput);
  card.addItem(itemFrequencyChoice);
  card.addItem(projectChoice);

  card.addAction(
    SubmitAction.from({
      id: "Action.Submit",
      title: "Add Item",
      style: "positive",
    })
  );

  response.status(200).json({ card });
};

app.get("/ping", processPing);
app.post("/process", processRequest);

app.listen(port, () => {
  console.log(`UI Extension server running on port ${port}.`);
});
