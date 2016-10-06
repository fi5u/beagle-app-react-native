import React, { Component } from 'react'
import {
    ListView,
    View
} from 'react-native'
import Drawer from 'react-native-drawer'
import Menu from './components/menu/menu'
import Websites from './components/websites/websites'
import Settings from './components/settings/settings'
import styles from './root.style'

export default class Root extends Component {
    constructor(props) {
        super(props);

        const dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this._state = {
            // Menu
            activeMenuItem: 'websites',

            // Websites
            websites: dataStore.cloneWithRows([{
                url: '',
                template: 'abc.com/[?]',
                title: 'Abc site',
                divider: '+',
                dateCreated: '2016-10-01 16:00 +0200',
                dateModified: '',
                searchStrings: ['hello', 'goodbye']
            }]),
            websiteModalIsVisible: false,
            websiteInputMode: 'auto',
            websiteInputUrlValue: '',
            websiteInputTemplateValue: '',
            websiteInputTitleValue: '',
            websiteInputWordDividerValue: '+',
            websiteInputsDisabled: false,
        };

        this.allowedInputModes = [
            'custom',
            'auto'
        ];
    }

    // STATE SETTING
    setStateFromComp(state, value) {
        this.setState({[state]: value})
    }

    // MENU
    handleMenuItemPress(newMenuItemID) {
        this.setState({activeMenuItem: newMenuItemID});
        this._drawer.close();
    }

    // WEBSITES
    handleStartAddWebsite() {
        this.setState({websiteModalIsVisible: true});
    }

    handleHideWebsiteModal() {
        this.setState({websiteModalIsVisible: false});
    }

    handleSaveWebsite() {
        //alert('saving');
    }

    handleWebsiteModalClose() {
        alert('is closed');
    }

    setWebsiteInputMode(mode) {
        if(this.allowedInputModes.indexOf(mode) > -1) {
            this.setState({websiteInputMode: mode});
        }
    }

    checkAutoWebsite() {
        this.setState({websiteInputsDisabled: true});
    }

    isInputValid(id) {
        switch(id) {
            case 'websiteInputUrlValue':
                return this._state.websiteInputUrlValue.length > 3 || false;
                break;
            case 'websiteInputTemplateValue':
                // matches [?] or [?:1] [?:2] etc
                return /(?:\[\?\])|(?:\[\?:\d+\])/g.test(this._state.websiteInputTemplateValue) || false;
                break;
            case 'websiteInputTitleValue':
                return this._state.websiteInputTitleValue.length > 0 || false;
            default:
                return false;
        }
    }

    render() {
        let activePage;
        switch(this._state.activeMenuItem) {
            case 'settings':
                activePage = <Settings />;
                break;
            default:
                activePage =
                    <Websites
                        setStateFromComp={this.setStateFromComp.bind(this)}
                        websites={this._state.websites}
                        handleStartAddWebsite={this.handleStartAddWebsite.bind(this)}
                        websiteModalIsVisible={this._state.websiteModalIsVisible}
                        hideWebsiteModal={this.handleHideWebsiteModal.bind(this)}
                        saveWebsite={this.handleSaveWebsite.bind(this)}
                        websiteModalClosed={this.handleWebsiteModalClose.bind(this)}
                        websiteInputMode={this._state.websiteInputMode}
                        setWebsiteInputMode={this.setWebsiteInputMode.bind(this)}
                        isInputValid={this.isInputValid.bind(this)}
                        websiteInputUrlValue={this._state.websiteInputUrlValue}
                        websiteInputTemplateValue={this._state.websiteInputTemplateValue}
                        websiteInputWordDividerValue={this._state.websiteInputWordDividerValue}
                        websiteInputTitleValue={this._state.websiteInputTitleValue}
                        checkAutoWebsite={this.checkAutoWebsite.bind(this)}
                        websiteInputsDisabled={this._state.websiteInputsDisabled}
                    />;
        }

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={
                    <Menu
                        handleMenuItemPress={this.handleMenuItemPress.bind(this)}
                    />
                }
                type="static"
                openDrawerOffset={100}
                tweenHandler={Drawer.tweenPresets.parallax}
                panOpenMask={.1}
            >
                <View
                    style={styles.base}
                >
                    {activePage}
                </View>
            </Drawer>
        )
    }
}
