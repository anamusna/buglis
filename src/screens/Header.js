import React, { Component } from 'react';
import { Button } from 'react-native';

function Header() {
	return (
		<Button title="open" style={{ width: 50, height: 50 }} onPress={() => this.props.navigation.toggleDrawer()} />
	);
}

export default Header;
