
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const mainTab = () => {

Promise.all([
    Icon.getImageSource( 'beer', 25, 'grey'), 
    Icon.getImageSource('list', 25, 'grey'),         
    Icon.getImageSource('bars', 25, 'grey'),         
  ]) 
  .then(source => {  
    console.log(source[0].uri)  
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: 'navigation.playground.SideDrawer'    
            },
          },
          center: {
            bottomTabs: {
    
              children: [
                {
                  stack: {
                    id: 'Tab1', 
                    children: [     
                      {
                        component: {
                          id: 'AddNewBeer',
                          name: 'navigation.playground.AddNewBeer',
                          passProps: {
                            bottomIcon: {uri: source[0].uri},
                            leftIcon: {uri: source[2].uri }
                          }
                        }, 
                      },
                    ],
                  } 
                },
                {
                  stack: { 
                    id: 'Tab2',
                    children: [
                      {
                        component: {
                          id: 'YourBeerList',
                          name: 'navigation.playground.YourBeerList',
                          passProps: {
                            bottomIcon: {uri: source[1].uri},
                            leftIcon: {uri: source[2].uri }
                          }
                        },
                      },
                    ]
                  }
                },
              ],
              options: { 
                bottomTabs: {
                  backgroundColor: '#474749'   
                },
              },
            }
          }
        }
      }
    })
  })      
  .catch(err => alert(err))
}

export default mainTab

