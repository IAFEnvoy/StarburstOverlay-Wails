export class Config {
    constructor(path, defaultValue) {
        this.path = path;
        this.defaultValue = defaultValue == null ? {} : defaultValue
    }
    load = async () => {
        try {
            this.path = await window.go.main.App.GetPath('roaming') + this.path;
            let data = await window.go.main.App.ReadJsonString(this.path).catch(err => { throw err });
            this.config = JSON.parse(data);
        } catch (err) {
            console.log(err)
            this.config = this.defaultValue;
            return false;
        }
        console.log(this.config);
        return true;
    }
    get = (name) => {
        if (this.config[name] == null) {
            if (this.defaultValue[name] != null) {
                this.config[name] = this.defaultValue[name];
                return this.config[name];
            } else return null;
        } else return this.config[name];
    }
    set = async (name, val) => {
        console.log(name, val);
        this.config[name] = val;
        await window.go.main.App.WriteJsonString(this.path, JSON.stringify(this.config))
    }
}

window.Config = Config;