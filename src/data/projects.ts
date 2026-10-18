// Sample projects for the demo build. Replace with real work before publishing.

export type ArchNode = {
  id: string;
  label: string;
  detail: string;
  x: number; // diagram coordinates: x 0 to 1000, y roughly 120 to 440
  y: number;
  kind: 'client' | 'service' | 'store' | 'queue' | 'edge';
};

export type ArchEdge = { from: string; to: string; label?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  duration: string;
  overview: string[];
  responsibilities: string[];
  stack: { layer: string; items: string[] }[];
  architecture: {
    nodes: ArchNode[];
    edges: ArchEdge[];
    notes: { title: string; body: string }[];
  };
  decisions: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  results: { value: string; label: string }[];
  images: { alt: string; caption: string }[];
  hue: number; // placeholder artwork tint
};

export const PROJECTS: Project[] = [
  {
    slug: 'floodline',
    name: 'Floodline',
    tagline: 'River sensors and a forecast that warn a street hours before the water reaches it.',
    summary:
      'Flood early warning for the Vesdre and Meuse valleys: low-power sensors measure river levels and rain, a model forecasts the next six hours, and residents get alerts for their own street.',
    year: '2026',
    role: 'Solo project. Sensor network, data pipeline, forecasting model, alert app.',
    duration: '6 months',
    overview: [
      'In July 2021 the Vesdre rose faster than anyone expected, and many people in Pepinster and Verviers had minutes of warning instead of hours. Floodline is my attempt at the part of that problem software can help with: knowing early, per street, how high the water will get.',
      'Battery-powered sensors along the river measure water level and rainfall every five minutes and send them over LoRaWAN, a radio network that reaches kilometres on very little power. The readings flow through Kafka into a forecasting model that predicts the level at each river section six hours ahead, updated every time new data arrives.',
      'Residents pick their street once. When the forecast for their section crosses a threshold, they get a push notification and an SMS with the expected peak time and height. A Grafana board gives the crisis team the same picture for the whole valley.',
    ],
    responsibilities: [
      'Chose the sensors, set up the LoRaWAN gateways and wrote the Go service that turns radio messages into clean readings.',
      'Built the forecasting model in Python and the backtests against historical river data.',
      'Built the alert service and the React app where residents follow their street.',
      'Ran the system on Kubernetes with Prometheus and Grafana watching every sensor and job.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'SQLite', 'Kafka', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'sensors', label: 'River sensors', detail: 'Level + rain', x: 90, y: 150, kind: 'client' },
        { id: 'gateway', label: 'LoRa gateways', detail: 'MQTT, SQLite buffer', x: 300, y: 150, kind: 'edge' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, cleaning', x: 510, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Readings', x: 720, y: 150, kind: 'queue' },
        { id: 'model', label: 'Forecast', detail: 'Python, 6h ahead', x: 910, y: 280, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'Readings, forecasts', x: 720, y: 410, kind: 'store' },
        { id: 'alerts', label: 'Alerts', detail: 'Go, push + SMS', x: 510, y: 410, kind: 'service' },
        { id: 'app', label: 'Resident app', detail: 'React', x: 300, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'sensors', to: 'gateway', label: 'LoRaWAN' },
        { from: 'gateway', to: 'ingest', label: 'MQTT' },
        { from: 'ingest', to: 'kafka', label: 'readings' },
        { from: 'kafka', to: 'model' },
        { from: 'model', to: 'db', label: 'forecasts' },
        { from: 'db', to: 'alerts', label: 'thresholds' },
        { from: 'alerts', to: 'app', label: 'push' },
      ],
      notes: [
        {
          title: 'Gateways',
          body: 'Sensors send a reading every five minutes. Gateways on rooftops forward them over MQTT and keep up to 48 hours of readings in SQLite if their uplink drops, so a storm that knocks out the mobile network does not leave holes in the data.',
        },
        {
          title: 'Ingest',
          body: 'A Go service checks each reading against the calibration of its sensor, drops obvious glitches such as a level jumping two metres in five minutes, and publishes clean readings to Kafka. Every sensor has a health score, and Prometheus warns me when one goes quiet.',
        },
        {
          title: 'Forecast model',
          body: 'A gradient boosted model in Python predicts the level at each river section from 15 minutes to 6 hours ahead, using upstream levels, rainfall and soil moisture. It is retrained weekly and backtested on the 2021 flood and other high-water events before a new version goes live.',
        },
        {
          title: 'Alerts',
          body: 'Each street has its own threshold, based on the height of its lowest doorways. Alerts include the expected peak time and height, and they are only sent again when the forecast changes by more than 20 centimetres, so people do not learn to ignore them.',
        },
      ],
    },
    decisions: [
      {
        title: 'LoRaWAN instead of mobile data',
        body: 'Sensors along a river sit in valleys with poor coverage and no power. LoRaWAN reaches several kilometres, and a sensor runs about three years on one battery.',
      },
      {
        title: 'Forecast per street, not per river',
        body: 'A single warning level for a whole river is what people learned to ignore. Mapping each river section to the streets it floods made alerts rarer and much more specific.',
      },
      {
        title: 'Kafka between sensors and the model',
        body: 'During a storm, readings arrive in bursts after gateways reconnect. Kafka absorbs the burst and lets me replay a whole night of data through a new model version.',
      },
    ],
    challenges: [
      {
        title: 'Gateways going offline in storms',
        body: 'The first gateway lost power during heavy rain, exactly when the data mattered most. Each gateway now has a small battery and the SQLite buffer, and readings are backfilled in order when it comes back.',
      },
      {
        title: 'Too many false alarms',
        body: 'Early versions warned on every rainy afternoon. Per-street thresholds and a minimum forecast confidence cut false alarms by about 80% in the backtests.',
      },
    ],
    results: [
      { value: '6h', label: 'Forecast horizon' },
      { value: '92%', label: 'Floods caught 2h+ ahead in backtests' },
      { value: '3y', label: 'Sensor battery life' },
      { value: '5min', label: 'Reading interval' },
    ],
    images: [
      { alt: 'Floodline resident app with a street forecast', caption: 'Street forecast' },
      { alt: 'Map of sensors along the Vesdre', caption: 'Sensor map' },
      { alt: 'Grafana board for the crisis team', caption: 'Crisis board' },
    ],
    hue: 175,
  },
  {
    slug: 'spoorzicht',
    name: 'Spoorzicht',
    tagline: 'Know if your train will be late before the board does, and whether you will make your connection.',
    summary:
      'Delay predictions for every Belgian train and station, trained on years of iRail open data and live weather, with a map that shows delays spreading through the network.',
    year: '2026',
    role: 'Solo project. Data pipeline, models, map and API.',
    duration: '4 months',
    overview: [
      'Belgian trains share a dense network, so one late train in Brussels can delay others an hour later in Ghent or Liège. Spoorzicht predicts those delays per train and per station, and answers the question people have on the platform: will I make my connection?',
      'iRail publishes live departures and delays for the whole NMBS/SNCB network as open data. I poll it every 30 seconds, store years of history, and combine it with weather and calendar data such as school holidays and strikes. Python models trained on that history predict the delay at each upcoming stop.',
      'The web app shows a live map where delays spread along the lines in real time. Pick two trains and it gives the chance of catching the connection, with the reason in plain words, such as "this train usually loses three minutes before Brussels-North".',
    ],
    responsibilities: [
      'Wrote the Node.js poller that keeps a clean live feed from iRail and publishes it to Kafka.',
      'Built the feature pipeline and the delay models in Python, with nightly retraining.',
      'Built the React map that animates delays across the network.',
      'Wrote the connection checker API and a backtest that compares predictions with what really happened.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Python', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'Kafka', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'irail', label: 'iRail', detail: 'Open train data', x: 90, y: 150, kind: 'client' },
        { id: 'poller', label: 'Poller', detail: 'Node.js, every 30s', x: 300, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Live events', x: 510, y: 150, kind: 'queue' },
        { id: 'features', label: 'Features', detail: 'Python, weather', x: 720, y: 150, kind: 'service' },
        { id: 'model', label: 'Delay model', detail: 'Python, nightly', x: 910, y: 280, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'History, predictions', x: 720, y: 410, kind: 'store' },
        { id: 'api', label: 'API', detail: 'Node.js, Redis', x: 510, y: 410, kind: 'service' },
        { id: 'map', label: 'Live map', detail: 'React', x: 300, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'irail', to: 'poller', label: 'poll' },
        { from: 'poller', to: 'kafka', label: 'events' },
        { from: 'kafka', to: 'features' },
        { from: 'features', to: 'model' },
        { from: 'model', to: 'db', label: 'predictions' },
        { from: 'db', to: 'api' },
        { from: 'api', to: 'map', label: 'live' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'The poller asks iRail for every departure board every 30 seconds, removes duplicates and turns the boards into events such as "IC 1832 left Leuven 4 minutes late". Those events go to Kafka, so the models, the map and the history all read the same stream.',
        },
        {
          title: 'Training data',
          body: 'Each prediction uses the current delay, the delay this train usually builds up on each stretch, how busy the line is, the weather and the calendar. Five years of history in Postgres gives about 40 million stops to learn from.',
        },
        {
          title: 'Delay model',
          body: 'A gradient boosted model predicts the delay at every upcoming stop. It is retrained every night on the latest data and only replaces the live version if it beats it on the last two weeks.',
        },
        {
          title: 'Live map',
          body: 'Redis holds the live position and delay of every train, and the React map redraws from it once a second. The connection checker combines two delay predictions into one chance and shows which stretch of the journey is the risk.',
        },
      ],
    },
    decisions: [
      {
        title: 'Predict per stop, not per train',
        body: 'A train can be on time in Antwerp and ten minutes late in Brussels. Predicting each stop separately made the connection checker possible and was more accurate than one number per journey.',
      },
      {
        title: 'Simple models over deep learning',
        body: 'Gradient boosted trees trained in minutes, were easy to explain and beat my neural network attempts on this data. Being able to say why a prediction is high matters to people on a platform.',
      },
    ],
    challenges: [
      {
        title: 'Gaps in the live feed',
        body: 'Sometimes a train disappears from the boards for a few stations. The pipeline now fills short gaps from the timetable and marks them, so the model does not learn from made-up delays.',
      },
      {
        title: 'Strike days skewing the model',
        body: 'Strike days look like extreme delays and confused the model. They are now flagged from the calendar and handled separately, which cut the average error on normal days by 18%.',
      },
    ],
    results: [
      { value: '1.8min', label: 'Average error at the next stop' },
      { value: '86%', label: 'Connections called right' },
      { value: '40M', label: 'Stops in the training data' },
      { value: '30s', label: 'Live update interval' },
    ],
    images: [
      { alt: 'Spoorzicht live map of delays across Belgium', caption: 'Live delay map' },
      { alt: 'Connection checker for two trains', caption: 'Connection checker' },
      { alt: 'Backtest report comparing predictions and real delays', caption: 'Model backtest' },
    ],
    hue: 55,
  },
  {
    slug: 'gridflex',
    name: 'Gridflex',
    tagline:
      'Keeps your monthly power peak low by moving the car, the heat pump and the battery to the right quarter hour.',
    summary:
      'A home energy agent built for the Flemish capacity tariff: it watches the meter, forecasts solar and household use, and shifts flexible loads so the monthly peak stays low.',
    year: '2025',
    role: 'Solo project. Device agent, forecasting, backend, app.',
    duration: '5 months',
    overview: [
      'Since 2023, households in Flanders pay part of their electricity bill based on their highest 15-minute peak of the month. Charging the car while the oven and heat pump are on can set an expensive peak in one evening. Gridflex is an agent that sits in the house and stops that from happening.',
      'A small Go program on a Raspberry Pi reads the digital meter every second through its P1 port and talks to the EV charger, heat pump and home battery over the local network. It forecasts solar output and household use for the next day, plans when each flexible device should run, and adjusts the plan live if someone turns on the oven.',
      'The Angular app shows the house live, including the current quarter hour, and how much the agent saved this month. A .NET backend keeps accounts and history and pushes new forecast models to every house.',
    ],
    responsibilities: [
      'Wrote the Go agent that reads the meter and controls the charger, heat pump and battery.',
      'Built the solar and load forecasts in Python and the planner that schedules flexible devices.',
      'Built the .NET backend in C# for accounts, history and model updates.',
      'Built the Angular app with a live view of the house.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', '.NET', 'C#', 'Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'SQLite', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Linux', 'Caddy', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'meter', label: 'Digital meter', detail: 'P1, every second', x: 90, y: 150, kind: 'client' },
        { id: 'devices', label: 'Devices', detail: 'Charger, heat pump', x: 90, y: 410, kind: 'client' },
        { id: 'agent', label: 'Home agent', detail: 'Go, Raspberry Pi', x: 330, y: 280, kind: 'service' },
        { id: 'local', label: 'Local history', detail: 'SQLite', x: 560, y: 410, kind: 'store' },
        { id: 'backend', label: 'Backend', detail: '.NET, C#', x: 560, y: 150, kind: 'service' },
        { id: 'forecast', label: 'Forecasts', detail: 'Python models', x: 800, y: 150, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'History, accounts', x: 800, y: 410, kind: 'store' },
        { id: 'app', label: 'App', detail: 'Angular', x: 930, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'meter', to: 'agent', label: 'P1' },
        { from: 'agent', to: 'devices', label: 'control' },
        { from: 'agent', to: 'local' },
        { from: 'agent', to: 'backend', label: 'sync' },
        { from: 'backend', to: 'forecast', label: 'train' },
        { from: 'backend', to: 'db' },
        { from: 'forecast', to: 'app' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'The agent reads the P1 port of the digital meter every second and keeps a running estimate of the current quarter hour. By minute 7 it knows whether the quarter is heading for a new peak, which leaves time to react.',
        },
        {
          title: 'Planning',
          body: 'Every night the agent builds a plan for the next day from the solar and usage forecasts: when to charge the car, when to preheat the house, when the battery should charge or help out. During the day it corrects the plan every minute when reality differs from the forecast.',
        },
        {
          title: 'Device control',
          body: 'Chargers, heat pumps and batteries speak different protocols, mostly Modbus and OCPP. The agent wraps each one in the same small interface: what it draws now, how much it can shift, and how to tell it to change. Adding a new brand is one Go file.',
        },
        {
          title: 'Forecasts',
          body: 'Python models forecast solar output from the weather forecast and the panel layout, and household use from the past weeks. The backend trains them per house and pushes new versions to the agent, which keeps working offline with the last one it received.',
        },
      ],
    },
    decisions: [
      {
        title: 'Run the planner in the house',
        body: 'If the internet drops, the peak still counts. Putting the planner on the Raspberry Pi with a local SQLite history means the house keeps optimising without a connection.',
      },
      {
        title: 'Plan ahead, correct live',
        body: 'Pure live control reacts too late within a 15-minute window. A day plan plus a correction every minute kept peaks low without constantly switching devices on and off.',
      },
    ],
    challenges: [
      {
        title: 'Heat pumps that ignored commands',
        body: 'One heat pump brand accepted commands and then went back to its own schedule. The agent now reads back the state after every change and marks devices that do not follow, so the planner stops relying on them.',
      },
      {
        title: 'Comfort complaints',
        body: 'Early plans saved money but left the house cold in the morning. Each house now has comfort limits the planner may never cross. Savings dropped a little and the complaints stopped.',
      },
    ],
    results: [
      { value: '31%', label: 'Lower monthly peak' },
      { value: '€180', label: 'Saved per year in the test house' },
      { value: '1s', label: 'Meter reading interval' },
      { value: '4', label: 'Device brands supported' },
    ],
    images: [
      { alt: 'Gridflex live view of the house', caption: 'Live house' },
      { alt: 'Day plan for car, heat pump and battery', caption: 'Day plan' },
      { alt: 'Monthly peak and savings report', caption: 'Monthly report' },
    ],
    hue: 85,
  },
  {
    slug: 'railwatch',
    name: 'Railwatch',
    tagline: 'Sensors on rail switches that spot wear days before a switch fails.',
    summary:
      'Predictive maintenance for railway switches: sensors run an anomaly model on the device, send only what matters, and every switch gets a risk score for the maintenance crews.',
    year: '2025',
    role: 'Solo project. Edge model, data pipeline, fleet dashboard.',
    duration: '5 months',
    overview: [
      'A railway switch that fails can stop a whole line, and most failures give small warnings first: a motor that draws a bit more current, a blade that vibrates differently when it moves. Railwatch puts sensors on switches to catch those warnings early, so crews can fix a switch during a planned night shift instead of during rush hour.',
      'Each sensor box records vibration and motor current every time the switch moves, plus the temperature. A small model runs on the box itself and compares each movement with what is normal for that switch. Normal movements are summarised and unusual ones are sent in full, which keeps data costs low across thousands of switches.',
      'In the backend, Kafka collects events from every switch, a Python model turns them into a risk score, and a dashboard ranks switches by how likely they are to fail in the coming week. Each score comes with the movements that caused it, so crews can check it before they go out.',
    ],
    responsibilities: [
      'Built the Go service on the sensor box that records each switch movement and runs the edge model.',
      'Trained the anomaly and risk models in Python on recorded movements.',
      'Built the Kafka pipeline and the storage for raw movements and risk scores.',
      'Built the React fleet dashboard that crews use to plan maintenance.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Python'] },
      { layer: 'Data', items: ['MongoDB', 'Kafka', 'PostgreSQL'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Linux', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'switch', label: 'Switch sensors', detail: 'Vibration, current', x: 90, y: 150, kind: 'client' },
        { id: 'box', label: 'Edge box', detail: 'Go + model', x: 300, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Movement events', x: 510, y: 150, kind: 'queue' },
        { id: 'raw', label: 'MongoDB', detail: 'Raw movements', x: 720, y: 150, kind: 'store' },
        { id: 'risk', label: 'Risk model', detail: 'Python, hourly', x: 510, y: 410, kind: 'service' },
        { id: 'scores', label: 'Postgres', detail: 'Scores, work orders', x: 720, y: 410, kind: 'store' },
        { id: 'dash', label: 'Fleet dashboard', detail: 'React', x: 910, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'switch', to: 'box', label: 'signals' },
        { from: 'box', to: 'kafka', label: 'anomalies' },
        { from: 'kafka', to: 'raw', label: 'store' },
        { from: 'kafka', to: 'risk' },
        { from: 'risk', to: 'scores', label: 'scores' },
        { from: 'scores', to: 'dash' },
        { from: 'raw', to: 'dash', label: 'evidence' },
      ],
      notes: [
        {
          title: 'On-device model',
          body: 'Every movement of the switch produces a short vibration and current signal. The box compares it with the normal pattern for that switch, learned in its first two weeks, and only sends movements that look unusual. That cuts the data sent by about 95%.',
        },
        {
          title: 'Ingest',
          body: 'Boxes send events over the mobile network to Kafka. If a box loses its connection it keeps events on disk and sends them later, in order, with the original timestamps.',
        },
        {
          title: 'Storage',
          body: 'Raw movement signals go to MongoDB, where each document holds one movement with its signal and metadata. Risk scores and work orders live in Postgres, because crews query them by line, region and date.',
        },
        {
          title: 'Risk scoring',
          body: 'A Python model combines recent anomalies, temperature, how often the switch moves and its repair history into a risk score for the next seven days. Scores are recalculated every hour, and the dashboard shows the movements that pushed a score up.',
        },
      ],
    },
    decisions: [
      {
        title: 'Model on the device',
        body: 'Sending every movement from thousands of switches would be expensive and mostly noise. Deciding on the box what is unusual kept data costs low and still kept the full signal of every movement that matters.',
      },
      {
        title: 'MongoDB for raw signals',
        body: 'Signals differ in length and in which sensors a box has. Storing each movement as a document fit that better than a fixed table, while scores stay in Postgres where reporting is easy.',
      },
    ],
    challenges: [
      {
        title: 'Cold mornings looked like failures',
        body: 'Switches move stiffer on frosty mornings, and early versions flagged half the fleet in January. Temperature is now part of what normal means for each switch.',
      },
      {
        title: 'Too few real failures to learn from',
        body: 'Failures are rare, which makes training hard. I combined the few recorded failures with simulated wear on a test switch to give the model enough examples.',
      },
    ],
    results: [
      { value: '4.5d', label: 'Average warning before a failure' },
      { value: '95%', label: 'Less data sent' },
      { value: '81%', label: 'Failures flagged in advance' },
      { value: '1h', label: 'Risk score refresh' },
    ],
    images: [
      { alt: 'Railwatch fleet dashboard ranked by risk', caption: 'Fleet risk' },
      { alt: 'Movement signal of one switch over a week', caption: 'Switch signals' },
      { alt: 'Work order planner for night shifts', caption: 'Work orders' },
    ],
    hue: 310,
  },
  {
    slug: 'streamline',
    name: 'Streamline',
    tagline: 'Live streaming with about two seconds of delay, and a chat that keeps up with big channels.',
    summary:
      'A Twitch-style platform: streamers go live from OBS, viewers watch in the browser, and chat fans out to every viewer in real time.',
    year: '2026',
    role: 'Solo project. Architecture, backend services, player and infrastructure.',
    duration: '5 months',
    overview: [
      'Streamline lets anyone go live from OBS and watch from a browser with about two seconds between the camera and the screen. Most hobby streaming setups sit at ten seconds or more, which kills the back and forth between a streamer and their chat. Getting that number down, while still serving thousands of viewers per stream, was the goal of the whole project.',
      'The platform has four moving parts. An ingest service accepts RTMP from the streamer, transcoding workers turn one stream into several qualities, the video is delivered as low-latency HLS through a CDN, and a separate chat system pushes messages to every viewer over WebSockets. Viewer counts, follows and chat activity flow through Kafka into a live dashboard for streamers.',
      'I built it to understand how real video platforms work under load, so every piece is something I could explain in an interview: why the segments are small, why chat is sharded by channel, and what happens when a transcoding worker dies in the middle of a stream.',
    ],
    responsibilities: [
      'Designed the system and wrote the architecture docs before writing code.',
      'Built the Go ingest and chat services, and the React watch page with a low-latency HLS player.',
      'Set up the Kubernetes cluster, autoscaling for transcoders, and the CI pipeline.',
      'Load tested chat with a custom Go client that opens thousands of sockets.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka'] },
      { layer: 'Infra', items: ['Kubernetes', 'Docker', 'Caddy', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'obs', label: 'OBS', detail: 'Streamer sends RTMP', x: 90, y: 150, kind: 'client' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, RTMP, stream keys', x: 290, y: 150, kind: 'service' },
        { id: 'transcode', label: 'Transcoders', detail: 'FFmpeg on Kubernetes', x: 500, y: 150, kind: 'service' },
        { id: 'cdn', label: 'Origin + CDN', detail: 'LL-HLS via Caddy', x: 710, y: 150, kind: 'edge' },
        { id: 'player', label: 'Watch page', detail: 'React player', x: 910, y: 280, kind: 'client' },
        { id: 'chat', label: 'Chat gateway', detail: 'Go WebSockets', x: 710, y: 410, kind: 'service' },
        { id: 'redis', label: 'Redis', detail: 'Pub/sub per channel', x: 500, y: 410, kind: 'store' },
        { id: 'kafka', label: 'Kafka', detail: 'Events', x: 290, y: 410, kind: 'queue' },
        { id: 'stats', label: 'Postgres', detail: 'Stats rollups', x: 90, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'obs', to: 'ingest', label: 'RTMP' },
        { from: 'ingest', to: 'transcode', label: 'raw stream' },
        { from: 'transcode', to: 'cdn', label: '3 renditions' },
        { from: 'cdn', to: 'player', label: 'LL-HLS' },
        { from: 'player', to: 'chat', label: 'WebSocket' },
        { from: 'chat', to: 'redis', label: 'fan-out' },
        { from: 'ingest', to: 'kafka', label: 'events' },
        { from: 'kafka', to: 'stats' },
      ],
      notes: [
        {
          title: 'Ingest',
          body: 'A Go service accepts RTMP connections, checks the stream key against Postgres, and hands the stream to a transcoding worker. It holds no video on disk, so it can restart without dropping anyone for more than a second.',
        },
        {
          title: 'Transcoding',
          body: 'Each live stream gets its own FFmpeg worker pod that produces 1080p, 720p and 480p. A small scheduler watches queue depth and adds pods before the cluster runs out of room. If a worker dies, ingest notices the broken pipe and reattaches the stream to a fresh worker.',
        },
        {
          title: 'Delivery',
          body: 'Workers write one-second LL-HLS parts to shared storage. Caddy serves them as the origin behind a CDN, with short cache times on playlists and long ones on segments. The player starts close to the live edge and catches up by playing slightly faster when it falls behind.',
        },
        {
          title: 'Chat',
          body: 'Chat gateways hold the WebSocket connections. Every channel maps to a Redis pub/sub topic, so a message is published once and each gateway forwards it only to its own viewers. Slow mode, bans and a toxicity check run before a message is published.',
        },
        {
          title: 'Analytics',
          body: 'Gateways and ingest emit events to Kafka. A Node.js consumer keeps live counters in Redis for "viewers right now" and writes per-minute rollups to Postgres for history, so the streamer dashboard refreshes every second.',
        },
      ],
    },
    decisions: [
      {
        title: 'LL-HLS for video, WebRTC left out',
        body: 'WebRTC gets under one second of delay, but every viewer needs its own connection to a media server, which gets expensive fast. LL-HLS is plain HTTP, so a CDN does the heavy lifting and two seconds is close enough for chat to feel live.',
      },
      {
        title: 'Chat sharded by channel',
        body: 'Most channels are small and a few are huge. Routing by channel keeps a big stream from slowing everyone else down, and Redis pub/sub means gateways never talk to each other directly.',
      },
      {
        title: 'Kafka between services and analytics',
        body: 'Writing stats straight to the database would tie chat latency to database latency. With Kafka in between, chat stays fast even if the stats database is slow or down for maintenance.',
      },
    ],
    challenges: [
      {
        title: 'Players drifting behind the live edge',
        body: 'On weak connections the player kept buffering and ending up 15 seconds behind. I added a catch-up rule: if the buffer grows past three seconds, playback speeds up to 1.1x until it is back near the edge.',
      },
      {
        title: 'Chat bursts during raids',
        body: 'When a big channel raids a small one, thousands of viewers arrive in seconds. The gateway now batches outgoing messages every 100ms, which cut CPU use during bursts by more than half.',
      },
    ],
    results: [
      { value: '2.1s', label: 'Camera-to-screen delay' },
      { value: '100k', label: 'Chat sockets in load tests' },
      { value: '180ms', label: 'p99 chat delivery' },
      { value: '3', label: 'Qualities per stream' },
    ],
    images: [
      { alt: 'Streamline watch page with player and chat', caption: 'Watch page' },
      { alt: 'Streamer dashboard with live viewer graph', caption: 'Streamer dashboard' },
      { alt: 'Grafana board for ingest and chat', caption: 'Monitoring' },
    ],
    hue: 268,
  },
  {
    slug: 'hatch',
    name: 'Hatch',
    tagline: 'Push to Git and get a live preview URL in under a minute, on your own servers.',
    summary:
      'A self-hosted deployment platform in the spirit of Vercel: every branch gets its own preview, builds run in locked-down containers, and logs stream into the browser as they happen.',
    year: '2026',
    role: 'Solo project. Platform design, build system, dashboard.',
    duration: '4 months',
    overview: [
      'Hatch is a deployment platform you run yourself. Connect a GitHub repository, and every push builds the project and publishes it at its own URL, like feature-login.hatch.example.com. Merging to main promotes the build to production with no downtime.',
      'The hard part is running untrusted build scripts safely and quickly. Hatch runs each build in a fresh Docker container with no network access beyond a package mirror, strict CPU and memory limits, and no way back into the host. It is thrown away afterwards. A layer cache keyed on the lockfile makes repeat builds much faster.',
      'The dashboard shows every deployment, streams build logs live, and lets you roll production back to any earlier build with one click.',
    ],
    responsibilities: [
      'Designed the build pipeline, isolation model and routing layer.',
      'Wrote the Go control plane and the Docker build runner, with Bash scripts for each build step.',
      'Built the React dashboard with live log streaming over server-sent events.',
      'Wrote the GitHub App integration for webhooks and commit status checks.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'GitHub', 'Bash'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Caddy', 'Linux', 'Prometheus'] },
    ],
    architecture: {
      nodes: [
        { id: 'github', label: 'GitHub', detail: 'Push webhook', x: 90, y: 140, kind: 'client' },
        { id: 'api', label: 'Control plane', detail: 'Go API', x: 300, y: 140, kind: 'service' },
        { id: 'queue', label: 'Build queue', detail: 'Redis streams', x: 500, y: 140, kind: 'queue' },
        { id: 'runner', label: 'Build runners', detail: 'Docker containers', x: 700, y: 140, kind: 'service' },
        { id: 'artifacts', label: 'Artifacts', detail: 'Shared volume', x: 900, y: 140, kind: 'store' },
        { id: 'db', label: 'Postgres', detail: 'Projects, deploys', x: 300, y: 400, kind: 'store' },
        { id: 'dash', label: 'Dashboard', detail: 'React, SSE logs', x: 90, y: 400, kind: 'client' },
        { id: 'router', label: 'Edge router', detail: 'Caddy, TLS', x: 700, y: 400, kind: 'edge' },
        { id: 'visitor', label: 'Visitors', detail: 'branch.hatch.app', x: 900, y: 400, kind: 'client' },
      ],
      edges: [
        { from: 'github', to: 'api', label: 'webhook' },
        { from: 'api', to: 'queue', label: 'job' },
        { from: 'queue', to: 'runner' },
        { from: 'runner', to: 'artifacts', label: 'output' },
        { from: 'api', to: 'db' },
        { from: 'dash', to: 'api', label: 'SSE' },
        { from: 'artifacts', to: 'router' },
        { from: 'router', to: 'visitor', label: 'HTTPS' },
      ],
      notes: [
        {
          title: 'Control plane',
          body: 'A Go API receives GitHub webhooks, checks the signature, records the deployment in Postgres and puts a build job on a Redis stream. It also updates the commit status on GitHub so pull requests show the preview link.',
        },
        {
          title: 'Build runners',
          body: 'Runners pull jobs and start a container from a prepared build image. The project is built inside it by a Bash script, with no outside network except a package mirror. Logs are piped back line by line so the dashboard can show them live.',
        },
        {
          title: 'Caching',
          body: 'Dependency folders are cached by a hash of the lockfile. A repeat build with the same dependencies skips the install step entirely, which is where most build time goes.',
        },
        {
          title: 'Routing',
          body: 'Caddy handles TLS with automatic certificates and maps each subdomain to a build output on the artifact volume. Promoting to production only changes which build the main domain points at, so it is instant and easy to undo.',
        },
      ],
    },
    decisions: [
      {
        title: 'Throwaway containers for builds',
        body: 'Build scripts are untrusted code. Each one runs in a new container as a non-root user, with dropped capabilities, a read-only base image and no outside network, and the container is deleted when the build ends.',
      },
      {
        title: 'Server-sent events for logs',
        body: 'Logs only flow one way, from server to browser. SSE is plain HTTP, reconnects on its own and was far less code than a WebSocket setup.',
      },
      {
        title: 'Immutable deploys',
        body: 'A build is never changed after it finishes. Rollback is a pointer change instead of a rebuild, which is why it takes under a second.',
      },
    ],
    challenges: [
      {
        title: 'Slow cold builds',
        body: 'The first builds took over three minutes, mostly installing packages. The lockfile cache and a local package mirror brought a typical repeat build down to about 40 seconds.',
      },
      {
        title: 'Lost logs on reconnect',
        body: 'Refreshing the page during a build lost earlier output. Every log line now gets an ID, and the browser sends the last ID it saw so the server replays what was missed.',
      },
    ],
    results: [
      { value: '40s', label: 'Typical repeat build' },
      { value: '<1s', label: 'Rollback to any build' },
      { value: '1.2s', label: 'Build container start' },
      { value: '0', label: 'Downtime per deploy' },
    ],
    images: [
      { alt: 'Hatch deployment list with branch previews', caption: 'Deployments' },
      { alt: 'Live build log streaming in the dashboard', caption: 'Live build logs' },
      { alt: 'Project settings with domains and environment variables', caption: 'Project settings' },
    ],
    hue: 152,
  },
  {
    slug: 'ledgerline',
    name: 'Ledgerline',
    tagline: 'A shared finance workspace where several people edit the same books at once, even offline.',
    summary:
      'Real-time collaborative bookkeeping for small teams: edits merge without conflicts, every change is kept in an audit trail, and the books always balance.',
    year: '2025',
    role: 'Solo project. Sync engine, ledger rules, web app.',
    duration: '3 months',
    overview: [
      'Small companies often keep their books in a shared spreadsheet, which breaks the moment two people edit the same cell or someone works on a train with no signal. Ledgerline is a finance workspace built for that: several people can work on the same ledger at once, offline edits merge when the connection comes back, and nothing is ever silently overwritten.',
      'Underneath, every change is an event. The current state of the books is built from the event history, so you can see who changed what and when, and rebuild the books as they were on any past date.',
      'Accounting rules are enforced in one place. Every transaction is double entry, so debits always equal credits, and a period can be locked once it has been reported.',
    ],
    responsibilities: [
      'Designed the event model and the double-entry rules.',
      'Built the CRDT sync layer and the .NET relay server in C#.',
      'Wrote the Angular app, including offline storage in IndexedDB.',
      'Wrote tests that apply thousands of random edits and check the books still balance, plus Playwright tests for the main flows.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['.NET', 'C#'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Testing', items: ['Playwright', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'clientA', label: 'Browser A', detail: 'CRDT doc + IndexedDB', x: 100, y: 140, kind: 'client' },
        { id: 'clientB', label: 'Browser B', detail: 'Offline edits', x: 100, y: 400, kind: 'client' },
        { id: 'relay', label: 'Sync relay', detail: '.NET WebSockets', x: 360, y: 270, kind: 'service' },
        { id: 'rules', label: 'Ledger rules', detail: 'Double entry checks', x: 600, y: 140, kind: 'service' },
        { id: 'events', label: 'Event store', detail: 'Postgres, append only', x: 600, y: 400, kind: 'store' },
        { id: 'views', label: 'Projections', detail: 'Balances, reports', x: 860, y: 270, kind: 'store' },
      ],
      edges: [
        { from: 'clientA', to: 'relay', label: 'updates' },
        { from: 'clientB', to: 'relay', label: 'sync on reconnect' },
        { from: 'relay', to: 'rules', label: 'validate' },
        { from: 'relay', to: 'events', label: 'append' },
        { from: 'events', to: 'views', label: 'rebuild' },
        { from: 'rules', to: 'views' },
      ],
      notes: [
        {
          title: 'Local first',
          body: 'Each browser keeps its own copy of the ledger as a CRDT document stored in IndexedDB. The app reads and writes locally, so it is instant and works with no connection at all.',
        },
        {
          title: 'Sync relay',
          body: 'A .NET server relays CRDT updates between everyone in the same workspace. Because CRDT updates merge in any order, two people editing different lines offline end up with the same result when they reconnect.',
        },
        {
          title: 'Ledger rules',
          body: 'Before an update is accepted it goes through the rules service: the transaction must balance, accounts must exist and the period must not be locked. Rejected changes are sent back with a reason the UI shows next to the row.',
        },
        {
          title: 'Event store',
          body: 'Accepted changes are appended to an event table in Postgres and never edited. Balances and reports are projections built from those events, so any past state can be recreated for an audit.',
        },
      ],
    },
    decisions: [
      {
        title: 'CRDTs instead of locking rows',
        body: 'Locking would block people who are offline. CRDTs let everyone keep working and merge later, and the rules service catches the rare case where a merge would break the books.',
      },
      {
        title: 'Event sourcing for the books',
        body: 'Accounting needs a full history anyway. Storing events first made the audit trail free and made "show me March as it was in April" a simple query.',
      },
    ],
    challenges: [
      {
        title: 'Merges that broke the balance',
        body: 'Two offline users could each edit one side of the same transaction. The rules service now treats a transaction as one unit and flags it for review instead of accepting half of it.',
      },
      {
        title: 'Large workspaces loading slowly',
        body: 'Replaying years of events on every load was too slow. Snapshots every thousand events cut the initial load from seconds to under 300ms.',
      },
    ],
    results: [
      { value: '0', label: 'Lost edits in sync tests' },
      { value: '<300ms', label: 'Workspace load' },
      { value: '10k', label: 'Random edit sequences tested' },
      { value: '100%', label: 'Changes in the audit trail' },
    ],
    images: [
      { alt: 'Ledger view with two collaborators editing', caption: 'Shared ledger' },
      { alt: 'Audit trail showing who changed each row', caption: 'Audit trail' },
      { alt: 'Monthly report built from events', caption: 'Reports' },
    ],
    hue: 32,
  },
  {
    slug: 'courier',
    name: 'Courier',
    tagline: 'Chat, voice rooms and encrypted messages for communities, in the spirit of Discord.',
    summary:
      'A community chat app with servers, channels, live voice rooms through a WebRTC media server, presence for thousands of members, and end-to-end encrypted direct messages.',
    year: '2025',
    role: 'Solo project. Realtime backend, voice, web client.',
    duration: '4 months',
    overview: [
      'Courier is a chat app for communities. People join servers, talk in text channels, hop into voice rooms, and send each other private messages. It covers the parts of Discord that are hard to build: thousands of people online at once, voice with many speakers, and messages that only the sender and receiver can read.',
      'Voice runs through a selective forwarding unit. Each person sends one audio stream to the server, and the server forwards it to everyone else in the room, so a phone in a ten-person room is not uploading ten copies of its audio.',
      'Direct messages are end-to-end encrypted. Keys are created on the device and the server only ever stores encrypted messages it cannot read.',
    ],
    responsibilities: [
      'Built the realtime gateway and presence service in Go.',
      'Set up the Node.js voice server (mediasoup) and wrote the signaling.',
      'Implemented end-to-end encryption for DMs with the Web Crypto API.',
      'Built the React client, including notifications and message history.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Linux'] },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Client', detail: 'React, WebRTC', x: 100, y: 270, kind: 'client' },
        { id: 'gateway', label: 'Gateway', detail: 'Go WebSockets', x: 340, y: 140, kind: 'service' },
        { id: 'presence', label: 'Presence', detail: 'Who is online', x: 580, y: 140, kind: 'service' },
        { id: 'redis', label: 'Redis', detail: 'Pub/sub, presence', x: 820, y: 140, kind: 'store' },
        { id: 'sfu', label: 'Voice SFU', detail: 'mediasoup', x: 340, y: 410, kind: 'service' },
        { id: 'turn', label: 'TURN', detail: 'coturn relay', x: 580, y: 410, kind: 'edge' },
        { id: 'db', label: 'MongoDB', detail: 'Message history', x: 820, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'client', to: 'gateway', label: 'events' },
        { from: 'gateway', to: 'presence' },
        { from: 'presence', to: 'redis' },
        { from: 'gateway', to: 'db', label: 'messages' },
        { from: 'client', to: 'sfu', label: 'audio' },
        { from: 'sfu', to: 'turn', label: 'fallback' },
      ],
      notes: [
        {
          title: 'Gateway',
          body: 'Each client keeps one WebSocket open to a gateway. Messages, typing indicators and member updates all travel over it. Gateways publish to Redis so a message reaches members connected to any gateway, and store it in MongoDB. Accounts and servers live in Postgres.',
        },
        {
          title: 'Presence',
          body: 'Online status is stored in Redis with short expiry times that the client refreshes. Large servers only receive presence for members visible on screen, which keeps traffic flat as servers grow.',
        },
        {
          title: 'Voice',
          body: 'A Node.js media server built on mediasoup runs the voice rooms. The gateway handles signaling, and the client connects straight to the SFU. When a network blocks direct connections, traffic goes through a coturn TURN server.',
        },
        {
          title: 'Encrypted DMs',
          body: 'Each device creates a key pair with the Web Crypto API. Messages are encrypted on the sender device for each of the receiver devices, and the server stores only the encrypted text.',
        },
      ],
    },
    decisions: [
      {
        title: 'SFU instead of peer to peer',
        body: 'Peer to peer works for two or three people, but each extra person multiplies upload traffic. An SFU keeps upload at one stream per person no matter how big the room gets.',
      },
      {
        title: 'Presence only for what is on screen',
        body: 'Sending every status change for a 10,000 member server would flood clients. Subscribing to visible members only made large servers feel as light as small ones.',
      },
    ],
    challenges: [
      {
        title: 'Voice failing on school and office networks',
        body: 'Strict firewalls blocked the UDP traffic WebRTC prefers. Adding a TURN server on port 443 got those users connected, at the cost of a little extra delay.',
      },
      {
        title: 'Key changes on new devices',
        body: 'Logging in on a new phone meant old messages could not be decrypted there. Devices now share message keys with each other through an encrypted device link step.',
      },
    ],
    results: [
      { value: '25', label: 'Speakers in one voice room' },
      { value: '10k', label: 'Members per server tested' },
      { value: '90ms', label: 'Median message delivery' },
      { value: 'E2E', label: 'Encrypted direct messages' },
    ],
    images: [
      { alt: 'Courier server with channels and members list', caption: 'Server view' },
      { alt: 'Voice room with several speakers', caption: 'Voice room' },
      { alt: 'Encrypted direct message conversation', caption: 'Direct messages' },
    ],
    hue: 210,
  },
  {
    slug: 'pulse',
    name: 'Pulse',
    tagline: 'Logs, metrics and traces from every service in one place, with alerts that point at the cause.',
    summary:
      'A self-hosted tracing and logging platform: services send OpenTelemetry data, it lands in Postgres, and it links up with Prometheus metrics and Grafana dashboards.',
    year: '2025',
    role: 'Solo project. Ingest pipeline, storage schema, UI.',
    duration: '3 months',
    overview: [
      'When something breaks in a system with many services, you need to answer two questions fast: what is broken, and why. Pulse collects logs and traces from every service through OpenTelemetry and links them to the Prometheus metrics you already have, so one click takes you from a red Grafana graph to the exact slow request and the log lines it produced.',
      'The storage is PostgreSQL with tables partitioned by day. Recent days stay fast to query, and dropping an old partition deletes a whole day at once. Data is kept at full detail for a week and rolled up into summaries after that.',
      'Alerts are written as queries with thresholds. When one fires, the alert links straight to the traces from the same time window, so the person on call starts with evidence instead of a guess.',
    ],
    responsibilities: [
      'Designed the partitioned Postgres schema and the retention rules.',
      'Built the Go ingest service and the alert evaluator.',
      'Built the React UI, including the trace waterfall view, and Grafana links into it.',
      'Wrote a demo app with several services to generate realistic traffic.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go'] },
      { layer: 'Data', items: ['PostgreSQL', 'Kafka'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'apps', label: 'Your services', detail: 'OTel SDKs', x: 90, y: 270, kind: 'client' },
        { id: 'collector', label: 'Collector', detail: 'OTel Collector', x: 290, y: 270, kind: 'edge' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, batching', x: 480, y: 140, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Buffer', x: 480, y: 400, kind: 'queue' },
        { id: 'ch', label: 'Postgres', detail: 'Logs, traces', x: 690, y: 270, kind: 'store' },
        { id: 'alerts', label: 'Alerts', detail: 'Rule evaluator', x: 900, y: 140, kind: 'service' },
        { id: 'ui', label: 'Pulse UI', detail: 'React, Grafana', x: 900, y: 400, kind: 'client' },
      ],
      edges: [
        { from: 'apps', to: 'collector', label: 'OTLP' },
        { from: 'collector', to: 'ingest' },
        { from: 'ingest', to: 'kafka', label: 'batches' },
        { from: 'kafka', to: 'ch', label: 'insert' },
        { from: 'ch', to: 'alerts', label: 'queries' },
        { from: 'ch', to: 'ui' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'Services use the standard OpenTelemetry SDKs, so no custom code is needed. A collector next to them adds metadata such as service name and region, and forwards everything over OTLP.',
        },
        {
          title: 'Ingest',
          body: 'The Go ingest service groups incoming data into large batches and writes them with COPY, which is far faster than one insert per row. Kafka sits in between so a database restart never loses data.',
        },
        {
          title: 'Storage',
          body: 'Logs and traces live in separate Postgres tables that share a trace ID and timestamp, and Prometheus metrics carry the same service labels. That shared key is what makes jumping from a graph to a trace to its logs possible.',
        },
        {
          title: 'Alerts',
          body: 'Alert rules are SQL queries with a threshold and a time window. The evaluator runs them every 30 seconds and sends notifications to Slack or email, each with a link to the matching traces.',
        },
      ],
    },
    decisions: [
      {
        title: 'Postgres instead of a specialised store',
        body: 'A dedicated log database would be faster at huge scale, but Postgres with daily partitions handled my load fine, and it was one less system to learn and run.',
      },
      {
        title: 'OpenTelemetry instead of a custom agent',
        body: 'Writing my own agent would have locked users in. OpenTelemetry already has SDKs for most languages, so any service can send data to Pulse.',
      },
    ],
    challenges: [
      {
        title: 'Too many small inserts',
        body: 'Early on, every request became its own insert and Postgres fell behind. Batching for one second or 10,000 rows, whichever came first, and writing with COPY fixed it.',
      },
      {
        title: 'Rendering huge traces',
        body: 'Some traces had thousands of spans and froze the browser. The waterfall now only renders the rows on screen and collapses repeated spans into groups.',
      },
    ],
    results: [
      { value: '20k', label: 'Spans per second ingested' },
      { value: '120ms', label: 'p95 dashboard query' },
      { value: '7d', label: 'Kept at full detail' },
      { value: '30s', label: 'Alert check interval' },
    ],
    images: [
      { alt: 'Pulse trace waterfall for a slow request', caption: 'Trace waterfall' },
      { alt: 'Service dashboard with latency and error graphs', caption: 'Service dashboard' },
      { alt: 'Alert rule editor with a SQL query', caption: 'Alert rules' },
    ],
    hue: 350,
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    tagline: 'Ask a question about your company docs and get an answer with links to the exact pages.',
    summary:
      'Search over Notion, Google Drive and GitHub: documents are indexed with both keyword and vector search, and answers are written by an LLM that cites its sources.',
    year: '2026',
    role: 'Solo project. Indexing pipeline, ranking, chat UI.',
    duration: '3 months',
    overview: [
      'Every company has answers spread across Notion pages, Google Docs and READMEs that nobody can find. Atlas connects to those sources, keeps an up-to-date index, and lets people ask questions in plain language. Each answer comes with links to the paragraphs it was built from, so people can check it instead of trusting it blindly.',
      'Search combines two methods. Keyword search is good at exact names and error codes, and vector search is good at meaning. Atlas runs both and merges the results, which beat either one alone in my tests.',
      'Permissions carry over from the source. If you cannot open a document in Google Drive, Atlas will not use it to answer your question.',
    ],
    responsibilities: [
      'Built the connectors and the incremental sync jobs as Python workers.',
      'Designed the chunking, embedding and hybrid ranking.',
      'Wrote the answer step with citations and a check for unsupported claims.',
      'Built the React chat UI and an evaluation set to measure answer quality.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Linux', 'Caddy'] },
    ],
    architecture: {
      nodes: [
        { id: 'sources', label: 'Sources', detail: 'Notion, Drive, GitHub', x: 90, y: 140, kind: 'client' },
        { id: 'sync', label: 'Sync workers', detail: 'Python, Redis queue', x: 300, y: 140, kind: 'service' },
        { id: 'chunk', label: 'Chunk + embed', detail: 'Python', x: 510, y: 140, kind: 'service' },
        { id: 'pg', label: 'Postgres', detail: 'pgvector + full text', x: 720, y: 140, kind: 'store' },
        { id: 'ui', label: 'Chat UI', detail: 'React', x: 90, y: 400, kind: 'client' },
        { id: 'api', label: 'Query API', detail: 'Python', x: 300, y: 400, kind: 'service' },
        { id: 'rank', label: 'Hybrid ranking', detail: 'Full text + vectors', x: 510, y: 400, kind: 'service' },
        { id: 'llm', label: 'Answer', detail: 'LLM with citations', x: 720, y: 400, kind: 'edge' },
      ],
      edges: [
        { from: 'sources', to: 'sync', label: 'changes' },
        { from: 'sync', to: 'chunk' },
        { from: 'chunk', to: 'pg', label: 'vectors' },
        { from: 'ui', to: 'api', label: 'question' },
        { from: 'api', to: 'rank' },
        { from: 'rank', to: 'pg', label: 'search' },
        { from: 'rank', to: 'llm', label: 'top passages' },
      ],
      notes: [
        {
          title: 'Sync',
          body: 'Python workers, fed by a Redis queue, pull changes from each source on a schedule and through webhooks where available. Only changed documents are processed again, so keeping the index fresh stays cheap.',
        },
        {
          title: 'Chunking',
          body: 'Documents are split along their headings into passages of a few hundred words, each with its title path attached. Passages that keep their heading context rank much better than blind fixed-size chunks.',
        },
        {
          title: 'Hybrid ranking',
          body: 'A question runs as a full-text search and a vector search in Postgres at the same time. The two result lists are merged with reciprocal rank fusion, then filtered by what the user is allowed to see.',
        },
        {
          title: 'Answers',
          body: 'The top passages go to the LLM with instructions to answer only from them and cite each claim. A final check drops any sentence without a citation before the answer is shown.',
        },
      ],
    },
    decisions: [
      {
        title: 'pgvector instead of a separate vector database',
        body: 'Keeping vectors, text and permissions in one Postgres made filtering by access rights a normal SQL join and meant one less system to run.',
      },
      {
        title: 'Citations required for every claim',
        body: 'An answer people cannot check is not useful at work. Requiring citations made answers a little shorter and a lot more trustworthy.',
      },
    ],
    challenges: [
      {
        title: 'Good answers from the wrong version',
        body: 'Old copies of documents kept showing up. Each passage now carries the document revision, and old revisions are deleted when a newer one is indexed.',
      },
      {
        title: 'Measuring quality',
        body: 'It was hard to tell if a change made answers better. I wrote 150 real questions with known source pages and track how often the right page appears in the top results.',
      },
    ],
    results: [
      { value: '87%', label: 'Right page in top 5' },
      { value: '1.4s', label: 'Median answer time' },
      { value: '3', label: 'Connected sources' },
      { value: '100%', label: 'Answers with citations' },
    ],
    images: [
      { alt: 'Atlas chat answer with cited sources', caption: 'Answer with citations' },
      { alt: 'Connected sources and sync status', caption: 'Sources' },
      { alt: 'Search quality report over the test questions', caption: 'Quality report' },
    ],
    hue: 190,
  },
];

export const projectBySlug = (slug: string | undefined) => PROJECTS.find(p => p.slug === slug);
