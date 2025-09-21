Generate report from gui
rm -rf ~/jmeter_report && jmeter -g /Users/../report.jtl -o ~/jmeter_report && open ~/jmeter_report/index.html
