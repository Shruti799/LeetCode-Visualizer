// Body.js

import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';



function Body() {
  const [username, setUsername] = useState('');
  const [languageStats, setLanguageStats] = useState([]);
  const [skillStats, setSkillStats] = useState([]);
  const [submitStats, setSubmitStats] = useState({});
  const [currentRating, setCurrentRating] = useState(0);
  const [maxRating, setMaxRating] = useState(0);
  const [topPercentage, setTopPercentage] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [attendedContests, setAttendedContests] = useState(0);
  const [bestRank, setBestRank] = useState(0);
  const [worstRank, setWorstRank] = useState(0);
  const [globalRank, setGlobalRank] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [contestsData, setContestsData] = useState({}); // States to hold data


  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://leetcode-api-steel.vercel.app/api/user/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      const fetchedLanguageStats = data.languageStats || [];
      const fetchedSkillStats = data.skillStats || {};
      const fetchedSubmitStats = data.submitStats || {};


      setLanguageStats(fetchedLanguageStats);
      setSkillStats(fetchedSkillStats);
      setSubmitStats(fetchedSubmitStats);


      const userContestRanking = data.contestRanking.userContestRanking;
      setCurrentRating(Math.round(userContestRanking.rating));
      setTopPercentage(userContestRanking.topPercentage);


      // Calculating max rating from contest history
      let maxRating = Math.round(userContestRanking.rating);
      data.contestRanking.userContestRankingHistory.forEach(contest => {
        maxRating = Math.max(maxRating, Math.round(contest.rating));
      });
      setMaxRating(maxRating);


      // Extracting total problems from submitStats
      const totalProblems = fetchedSubmitStats.matchedUser?.submitStats?.acSubmissionNum?.find(stats => stats.difficulty === "All")?.count || 0;
      setTotalProblems(totalProblems);


      // Calculating number of attended contests
      const attendedContests = data.contestRanking.userContestRankingHistory.filter(contest => contest.attended).length;
      setAttendedContests(attendedContests);


      // Calculating best and worst rank
      let ranks = data.contestRanking.userContestRankingHistory.map(contest => contest.ranking).filter(rank => rank > 0);
      setBestRank(Math.min(...ranks));
      setWorstRank(Math.max(...ranks));


      // Setting global rank
      setGlobalRank(userContestRanking.globalRanking);


      // Setting contests data
      setContestsData(data.contestRanking);


      setShowChart(true); // Showing chart when data is fetched
    } catch (error) {
      setError('Error fetching user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShowChart(false); // Hide chart when username changes
  }, [username]);


  // Extracting data for submitStats column chart
  const submitStatsData = submitStats.matchedUser?.submitStats?.acSubmissionNum
    ?.filter(entry => entry.difficulty !== "All")
    ?.map(entry => [entry.difficulty, entry.count]);


  return (
    <div className={`body ${showChart ? 'data-loaded' : 'no-data-loaded'}`}>
      <div className="wide-box">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="LeetCode User Handle"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="search-icon">🔍</span>
          <button className="search-button" onClick={fetchUserData} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        {showChart && (
          <>
            <div className='chart-box'>
              <div className='chart-container'>
                <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Language', 'Count'],
                    ...languageStats.map(({ languageName, problemsSolved }) => [languageName, problemsSolved])
                  ]}
                  options={{
                    title: 'Languages',
                    titleTextStyle: { fontSize: 20 },
                    width: '150%',
                    height: '400px',
                    legend: 'none',
                    pieSliceText: 'label',
                    fontName: 'Roboto',
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
            </div>
            <div className='chart-box1'>
              <div className='chart-container1'>
                <Chart
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Tag', 'Count'],
                    ...(skillStats.advanced || []).map(({ tagName, problemsSolved }) => [tagName, problemsSolved]),
                    ...(skillStats.intermediate || []).map(({ tagName, problemsSolved }) => [tagName, problemsSolved]),
                    ...(skillStats.fundamental || []).map(({ tagName, problemsSolved }) => [tagName, problemsSolved])
                  ]}
                  options={{
                    title: 'Problem Tags',
                    titleTextStyle: { fontSize: 20 },
                    width: '180%',
                    height: '400px',
                    legend: 'right',
                    pieSliceText: 'label',
                    fontName: 'Roboto',
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '2' }}
                />
              </div>
            </div>
            <div className='chart-box2'>
              <div className='chart-container2'>
                <Chart
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Skill Level', 'Count'],
                    ['Advanced', skillStats.advanced ? skillStats.advanced.reduce((acc, curr) => acc + curr.problemsSolved, 0) : 0],
                    ['Intermediate', skillStats.intermediate ? skillStats.intermediate.reduce((acc, curr) => acc + curr.problemsSolved, 0) : 0],
                    ['Fundamental', skillStats.fundamental ? skillStats.fundamental.reduce((acc, curr) => acc + curr.problemsSolved, 0) : 0]
                  ]}
                  options={{
                    title: 'Skill Levels',
                    titleTextStyle: { fontSize: 20 },
                    width: '180%',
                    height: '400px',
                    legend: { position: 'none' },
                    fontName: 'Roboto',
                  }}
                  rootProps={{ 'data-testid': '3' }}
                />
              </div>
            </div>
            <div className='chart-box3'>
              <div className='chart-container3'>
                <Chart
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Difficulty', 'Count'],
                    ...submitStatsData
                  ]}
                  options={{
                    title: 'Problem Levels',
                    titleTextStyle: { fontSize: 20 },
                    width: '180%',
                    height: '400px',
                    legend: 'none',
                    fontName: 'Roboto',
                  }}
                  rootProps={{ 'data-testid': '4' }}
                />
              </div>
            </div>
            {showChart && (
              <div className='chart-box4'>
                <div className="table-container">
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Details</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Current Rating</td>
                        <td>{currentRating}</td>
                      </tr>
                      <tr>
                        <td>Max Rating</td>
                        <td>{maxRating}</td>
                      </tr>
                      <tr>
                        <td>Top Percentage</td>
                        <td>{topPercentage}%</td>
                      </tr>
                      <tr>
                        <td>Total Problems</td>
                        <td>{totalProblems}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {showChart && (
              <div className='chart-box5'>
                <div className="table-container1">
                  <table className="stats-table1">
                    <thead>
                      <tr>
                        <th>Details</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Number of Contests</td>
                        <td>{attendedContests}</td>
                      </tr>
                      <tr>
                        <td>Best Rank</td>
                        <td>{bestRank}</td>
                      </tr>
                      <tr>
                        <td>Worst Rank</td>
                        <td>{worstRank}</td>
                      </tr>
                      <tr>
                        <td>Global Rank</td>
                        <td>{globalRank}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Line chart for problems solved in attended contests */}
            {showChart && (
              <div className='chart-box6'>
                <div className='chart-container6'>
                  <Chart
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Contest', 'Problems Solved'],
                      ...(contestsData.userContestRankingHistory || [])
                        .filter(contest => contest.attended)
                        .map((contest, index) => [contest.contest.title, contest.problemsSolved])
                    ]}
                    options={{
                      title: 'Problems Solved for Attended Contests',
                      titleTextStyle: { fontSize: 20 },
                      width: '235%',
                      height: '400px',
                      legend: 'none',
                      fontName: 'Roboto',
                      hAxis: {
                        titleTextStyle: { italic: false },
                        gridlines: { count: Math.min(10, contestsData.userContestRankingHistory.filter(contest => contest.attended).length) }
                      },
                      vAxis: {
                        titleTextStyle: { italic: false }
                      },
                      tooltip: { isHtml: true }
                    }}
                    rootProps={{ 'data-testid': '6' }}
                  />
                </div>
              </div>
            )}
          </>
        )}
        </div>
      
      {showChart && (
        <div className='footer'>
          Developed by <a href="https://twitter.com/Shruti_Aug2" style={{ color: '#1aa1d9', textDecoration: 'none' }}>Shruti</a>
        </div>
      )} 
      {!showChart && (
      <div className='footer0'>
         Developed by <a href="https://twitter.com/Shruti_Aug2" style={{ color: '#1aa1d9', textDecoration: 'none' }}>Shruti</a>
      </div>
      )}
      {!showChart && (
      <div className='footer1'>
          <a href="https://twitter.com/Shruti_Aug2" style={{ color: '#0c85d0', textDecoration: 'none' }}>
         <FontAwesomeIcon icon={faTwitter} /> Twitter
         </a>
      </div>
      )}
    </div>
  );
}

export default Body;

/*#1DA1F2 */