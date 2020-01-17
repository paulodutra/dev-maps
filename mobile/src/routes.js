import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

/**
 * O createAppContainer tem que ir "por fora" da estrategia de de navegação e 
 * dentro a estrategia de navegação com as rotas(paginas)
 * Main : {
 *  screen: Main, (qual componente sera renderizado)
 *  navigationOptions: {
 *           title: 'DevRadar' (titulo da página)
 *      },
 * }
 * 
 * defaultNavigationOptions (opções padrão que se aplicam a todos os itens de navegação)
 * headerTintColor: Propriedade do container de navegação que define a cor do texto
 * headerBackTitleVisible: Titulo no Header das outras telas sem ser a principal
 */
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            },
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7D40E7'
            }
        }
    })
);



export default Routes;
