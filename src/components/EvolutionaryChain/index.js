const RightModule =  [
                {
                    id: 'common',
                    refName: 'common',
                    component: () => import('./components/Common')
                },
                {
                    id: 'connect',
                    refName: 'connect',
                    component: () => import('./components/Connect')
                },
                {
                    id: 'dispose',
                    refName: 'dispose',
                    component: () => import('./components/Dispose')
                },
                {
                    id: 'inquiry',
                    refName: 'inquiry',
                    component: () => import('./components/Inquiry')
                },
                {
                    id: 'risk',
                    refName: 'risk',
                    component: () => import('./components/Risk')
                },
                {
                    id: 'situation',
                    refName: 'situation',
                    component: () => import('./components/Situation')
                }
            ]
     
export default RightModule