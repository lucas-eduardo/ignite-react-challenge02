import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { Provider } from './context';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Provider>
        <SideBar />

        <Content />
      </Provider>
    </div>
  )
}