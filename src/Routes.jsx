import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoyaltyDashboard from './pages/loyalty-dashboard';
import BookDetailPages from './pages/book-detail-pages';
import AdvancedSearchFilterHub from './pages/advanced-search-filter-hub';
import FlashDealsCenter from './pages/flash-deals-center';
import Homepage from './pages/homepage';
import CommunityHub from './pages/community-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdvancedSearchFilterHub />} />
        <Route path="/loyalty-dashboard" element={<LoyaltyDashboard />} />
        <Route path="/book-detail-pages" element={<BookDetailPages />} />
        <Route path="/advanced-search-filter-hub" element={<AdvancedSearchFilterHub />} />
        <Route path="/flash-deals-center" element={<FlashDealsCenter />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
