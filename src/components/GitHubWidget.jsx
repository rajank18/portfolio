import { useEffect, useMemo, useRef } from 'react';
import 'activity-grid';

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

const hashDate = (date) => {
  const text = date.toISOString().slice(0, 10);
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 2147483647;
  }

  return hash / 2147483647;
};

const toLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getBurstWeight = (date) => {
  const month = date.getMonth();

  if (month === 7 || month === 8) return 1.05;
  if (month === 10 || month === 11) return 1.15;
  if (month === 1 || month === 2) return 1.1;
  if (month === 3 || month === 4) return 0.95;
  return 0.7;
};

const getClusterWeight = (date) => {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const clusters = [120, 185, 250, 320, 365];

  return clusters.reduce((weight, center) => {
    const distance = Math.abs(dayOfYear - center);
    const pulse = Math.max(0, 1 - distance / 18);

    return weight + pulse * 0.85;
  }, 0.15);
};

const createActivityData = () => {
  const data = [];
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear() - 1);

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const isoDate = toLocalDateString(date);
    const weekdayBias = [0.35, 0.7, 0.95, 1, 0.9, 0.55, 0.25][date.getDay()];
    const random = hashDate(date);
    const intensity = getBurstWeight(date) * getClusterWeight(date) * weekdayBias;
    const score = intensity * 1.15 + random * 0.45;
    const count = score < 0.7 ? 0 : score < 1.05 ? 1 : score < 1.45 ? 2 : score < 1.9 ? 3 : 4;

    data.push({
      date: isoDate,
      count,
    });
  }

  return data;
};

const GitHubWidget = () => {
  const gridRef = useRef(null);
  const activityData = useMemo(() => createActivityData(), []);
  const username = 'rajank18';

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      const startDateString = toLocalDateString(startDate);
      const endDateString = toLocalDateString(new Date());

      // Try to load real GitHub contribution levels for the public user.
      const mapLevelsToCounts = (level) => {
        // GitHub exposes level 0..4; map to approximate counts for visual parity
        switch (Number(level)) {
          case 0:
            return 0;
          case 1:
            return 1;
          case 2:
            return 3;
          case 3:
            return 6;
          case 4:
            return 10;
          default:
            return 0;
        }
      };

      const tryFetchGitHubContributions = async () => {
        try {
          const url = `https://github.com/users/${username}/contributions?from=${startDateString}&to=${endDateString}`;
          const res = await fetch(url, { credentials: 'omit' });

          if (!res.ok) throw new Error('Failed to fetch');

          const text = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const cells = Array.from(doc.querySelectorAll('td.ContributionCalendar-day'));

          if (!cells.length) throw new Error('No cells found');

          const parsed = cells
            .map((n) => ({ date: n.getAttribute('data-date'), level: n.getAttribute('data-level') }))
            .filter((x) => x.date)
            .map((x) => ({ date: x.date, count: mapLevelsToCounts(x.level) }));

          if (parsed.length) {
            grid.data = parsed;
            grid.startDate = startDateString;
            grid.endDate = endDateString;
            return true;
          }
        } catch (err) {
          // Fetch could be blocked by CORS or network; fall back to generated data
          // console.warn('GitHub fetch failed', err);
        }

        return false;
      };

      // Attempt to fetch GitHub contributions; fall back to generated activity data
      tryFetchGitHubContributions().then((ok) => {
        if (!ok) grid.data = activityData;
      });
      grid.colors = isDark
        ? ['#1f2937', '#374151', '#4b5563', '#6b7280', '#d1d5db']
        : ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563'];
      grid.emptyColor = isDark ? '#111827' : '#ffffff';
      grid.darkMode = isDark;
      grid.startWeekOnMonday = true;
      grid.skipWeekends = false;
      // start/end dates are set after fetch or fallback
    };

    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [activityData]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className=" md:px-6 md:py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-2">GitHub</p>
            <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">Contribution Graph</h3>
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">2025-26</span>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-12 gap-2.5 px-1 mb-4 text-[11px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <activity-grid
              ref={gridRef}
              className="block w-full"
              style={{
                '--activity-grid-cell-size': '11px',
                '--activity-grid-cell-gap': '4px',
                '--activity-grid-border-radius': '2px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubWidget;
