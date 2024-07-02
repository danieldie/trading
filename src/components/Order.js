import React, { useEffect, useRef } from 'react';

const TradingViewChart = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        // script.src = 'path_to_charting_library/charting_library.min.js';
        script.async = true;
        script.onload = () => {
            const datafeed = new window.Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com");

            new window.TradingView.widget({
                container: containerRef.current,
                locale: "en",
                library_path: 'https://charting-library.tradingview-widget.com/charting_library/',
                datafeed: datafeed,
                symbol: "AAPL",
                interval: "1",
                broker_factory: function (host) { return new window.Brokers.BrokerSample(host, datafeed); },
                broker_config: {
                    configFlags: {
                        // Configuration flags
                    },
                    durations: [
                        { name: 'DAY', value: 'DAY' },  // Day orders
                        { name: 'GTC', value: 'GTC' },  // Good-Til-Canceled orders
                    ],
                },
            });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div ref={containerRef} id="chartContainer" style={{ width: "100%", height: "500px" }}></div>
    );
};

export default TradingViewChart;