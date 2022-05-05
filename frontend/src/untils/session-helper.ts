const SessionHelper = {
    getDecodedItem(key :string) {
        var value, item = sessionStorage.getItem(key);

        if (item != undefined && item != null) {
            item = atob(item);

            if (item != undefined && item != null) {
                try {
                    value = JSON.parse(item);
                } catch (e) {
                    value = item;
                }
            } else {
                value = item;
            }
        }

        return value;
    },
    setDecodedItem(key :string, value :string) {
        var item = value;
        if (item != undefined && item != null && typeof item == 'object') {
            item = JSON.stringify(item);

            if (item != undefined && item != null) {
                item = btoa(item);
            }
        }

        sessionStorage.setItem(key, item);
    },
    getItem(key :string) {
        var value, item = sessionStorage.getItem(key);
        if (item != undefined && item != null) {
            try {
                value = JSON.parse(item);
            } catch (e) {
                value = item;
            }
        }

        return value;
    },
    getItemData(key :string) {
        return this.getItem(key).data;
    },
    setItem(key :string, value:string) {
        var item = value;
        if (item != undefined && item != null && typeof item == 'object') {
            item = JSON.stringify(item);
        }

        sessionStorage.setItem(key, item);
    },
    remove(key :string) {
        sessionStorage.removeItem(key);
    }
}

export default SessionHelper;