import React from 'react';
import { Group, Panel, PanelSpinner, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
    render() {
        return (
            <View activePanel="mainPanel">
                <Panel id="mainPanel">
                    <Group>
                        <PanelSpinner />
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default App;