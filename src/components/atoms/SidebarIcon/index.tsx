import { useCallback } from 'react';
import {
  IconAdjustmentsX,
  IconBrandDatabricks,
  IconBuildings,
  IconCalendarWeek,
  IconCategory,
  IconCircles,
  IconClockHour5,
  IconFlask,
  IconHome,
  IconIndentIncrease,
  IconNfc,
  IconSchool,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import IconContainer from '../IconContainer';

export default function SidebarIcon({ page }: { page: string }) {
  const renderIcon = useCallback((page: string) => {
    switch (page) {
      case '/':
        return <IconHome />;
      case '/experimental':
        return <IconFlask />;
      case '/role':
        return <IconCircles />;
      case '/rolemapping':
        return <IconAdjustmentsX />;
      case '/menu':
        return <IconCategory />;
      case '/student':
        return <IconSchool />;
      case '/user':
        return <IconUserSquareRounded />;
      case '/dataset':
        return <IconBrandDatabricks />;
      case '/parameter':
        return <IconIndentIncrease />;
      case '/institution':
        return <IconBuildings />;
      case '/attendance':
        return <IconCalendarWeek />;
      case '/nfc':
        return <IconNfc />;
      default:
        return <IconClockHour5 />;
    }
  }, []);

  return <IconContainer>{renderIcon(page.toLowerCase())}</IconContainer>;
}
