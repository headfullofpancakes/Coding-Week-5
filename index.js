class Member {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    } 

    describe() {
        return `${this.name} plays ${this.instrument}.`;
    }
}

class Band {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        if (member instanceof Member) {
            this.members.push(member);
        } else {
            throw new Error(`You can only add an instance of Member. Argument is not a member: ${member}`);
        }
    }

    describe() {
        return `${this.name} has ${this.members.length} members.`;
    }
}

class Menu {
    constructor() {
        this.bands = [];
        this.selectedBand = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createBand();
                    break;
                case '2':
                    this.viewBand();
                    break;
                case '3':
                    this.deleteBand();
                    break;
                case '4':
                    this.displayBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Band
        2) View Band
        3) Delete Band
        4) Display all Bands
        `);
    }

    showBandMenuOptions(BandInfo) {
        return prompt(` 
        0) back
        1) Create Member
        2) Delete Member
        -----------------------
        ${BandInfo}
        `);
    }


    displayBands() {
        let bandString = '';
        for (let i = 0; i < this.bands.length; i++) {
            bandString += i + ') ' + this.bands[i].name +'\n';
        }

        alert(bandString);
    }

    createBand() {
        let name = prompt('Enter name for new band:');
        this.bands.push(new Band(name));
    }

    viewBand() {
        let index = prompt('Enter the index of the band you wish to view:');
        if (index > -1 && index < this.bands.length) {
            this.selectedBand = this.bands[index];
            let description = 'Band Name: ' + this.selectedBand.name + '\n';
        
            for (let i = 0; i < this.selectedBand.members.length; i++) {
                description += i + ') ' + this.selectedBand.members[i].name 
                + ' - ' + this.selectedBand.members[i].instrument + '\n';
            }

            let selection = this.showBandMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createMember();
                    break;
                case '2':
                    this.deleteMember();
            }
        }
    }

    deleteBand() {
        let index = prompt('Enter the index of the band you wish to delete:');
        if (index > -1 && index < this.bands.length) {
            this.bands.splice(index, 1);
        }
    }

    createMember() {
        let name = prompt('Enter name for new member:');
        let instrument = prompt('Enter instrument for new player:');
        this.selectedBand.members.push(new Member(name, instrument));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the member you wish to delete:');
        if (index > -1 && index < this.selectedBand.members.length) {
            this.selectedBand.members.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();