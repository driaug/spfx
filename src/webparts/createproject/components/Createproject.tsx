import * as React from "react";
import styles from "./Createproject.module.scss";
import { ICreateprojectProps } from "./ICreateprojectProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class Createproject extends React.Component<
  ICreateprojectProps,
  {
    creating: boolean;
    name: string;
    type: "Private" | "Company";
    address: string;
  }
> {
  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
    this.state = {
      creating: false,
      name: "",
      address: "",
      type: "Company",
    };
  }

  private async createProject() {
    this.setState({ creating: true });
    try {
      await fetch(
        "https://prod-53.westeurope.logic.azure.com:443/workflows/bea3957dce4a4a69972db44d30f9f514/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NkJdrURSUpmaDPBMKY8Lsqj5h2LANIoojN_Ri1Q_WDM",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project: this.state.name,
            address: this.state.address,
            type: this.state.type,
          }),
        }
      );
    } catch (e) {
      console.log(e);
    }
    this.setState({ creating: false, name: "", address: "", type: "Company" });
  }

  public render(): React.ReactElement<ICreateprojectProps> {
    return (
      <div className={styles.createproject}>
        <h1>Add new customer</h1>
        <label htmlFor={"project"}>Customer name</label>
        <input
          disabled={this.state.creating}
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          name="project"
          placeholder="Customer name"
        />

        <label htmlFor={"address"}>Address</label>
        <textarea
          name={"address"}
          disabled={this.state.creating}
          onChange={(e) => this.setState({ address: e.target.value })}
          value={this.state.address}
          placeholder={"Customer address"}
        />

        <label htmlFor={"type"}>Type</label>
        <select
          onChange={(e) =>
            this.setState({ type: e.target.value as "Private" | "Company" })
          }
          disabled={this.state.creating}
          name={"type"}
          value={this.state.type}
        >
          <option value="Private">Private</option>
          <option value="Company">Company</option>
        </select>

        <button disabled={this.state.creating} onClick={this.createProject}>
          {this.state.creating ? "Please wait" : "Create new customer"}
        </button>
      </div>
    );
  }
}
