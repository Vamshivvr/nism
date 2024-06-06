import { ChevronLeft } from '@mui/icons-material';
import { Box, Stack, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useRootContext } from '../data/root.context';
import { sections } from '../Sidebar/sidebar.responsive';

const DashboardResponsiveHeader = () => {
  const { setShowSidebar, setSelectedPagesSection } = useRootContext();
  const theme = useTheme();
  const location = useLocation();
  const section = Object.values(sections).find((option) =>
    option.options.find((each) => each.path === location.pathname),
  );
  const subSection = section?.options.find((each) => each.path === location.pathname);
  return (
    <>
      
    </>
  );
};

export default DashboardResponsiveHeader;
