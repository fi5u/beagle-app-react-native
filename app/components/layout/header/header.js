import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './header.style'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    generateButtons(button, position) {
        if(button.position !== position) {
            return;
        }

        let textStyle = button.isValid === false ? styles.btnTextDisabled : styles.btnText;

        return(
            <TouchableOpacity
                key={button.title}
                onPress={button.onPress}
            >
                <Text
                    style={textStyle}
                >
                    {button.title}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        let primaryBtns;
        let secondaryBtns;

        if(this.props.buttons) {
            primaryBtns = this.props.buttons.map((button) => {
                return this.generateButtons(button, 'primary');
            });

            secondaryBtns = this.props.buttons.map((button) => {
                return this.generateButtons(button, 'secondary');
            });
        }


        return (
            <View
                style={[this.props.customStyle, styles.base]}
            >
                <Text
                    style={styles.title}
                >
                    {this.props.title}
                </Text>

                <View
                    style={styles.btnSecondary}
                >
                    {secondaryBtns}
                </View>

                <View
                    style={styles.btnPrimary}
                >
                    {primaryBtns}
                </View>
            </View>
        )
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            position: React.PropTypes.oneOf(['primary', 'secondary']),
            title: React.PropTypes.string,
            onPress: React.PropTypes.func,
            isValid: React.PropTypes.bool,
        })
    ),
}
