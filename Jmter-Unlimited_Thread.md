
# 📘 **50 UTG Scenarios Cookbook**

---

## 🔹 1–10: Basic & Constant Load

1. **Smoke Test** – 10 users, quick sanity check

   | Users | Ramp-Up | Hold | Shutdown |
   | ----- | ------- | ---- | -------- |
   | 10    | 30s     | 120s | 30s      |

2. **Flat Concurrency** – like CTG
   \| 200 | 300s | 1800s | 300s |

3. **Small Constant Load** – keep light traffic
   \| 50 | 60s | 900s | 60s |

4. **Medium Constant Load**
   \| 500 | 600s | 1800s | 600s |

5. **Heavy Constant Load**
   \| 2000 | 900s | 3600s | 900s |

6. **Short Duration Constant**
   \| 100 | 30s | 300s | 30s |

7. **Burst Flat Load**
   \| 1000 | 10s | 60s | 10s |

8. **All-Day Soak**
   \| 200 | 600s | 28800s | 600s |

9. **Weekend Constant**
   \| 300 | 900s | 172800s | 900s |

10. **Night Batch Constant**
    \| 50 | 60s | 21600s | 60s |

---

## 🔹 11–20: Step Load

11. **Step 50→100→200**
    \| 50 | 60s | 300s | 60s |
    \| 100 | 60s | 300s | 60s |
    \| 200 | 60s | 300s | 60s |

12. **Step Every 5 Min**
    \| 100 | 60s | 300s | 30s |
    \| 200 | 60s | 300s | 30s |
    \| 300 | 60s | 300s | 30s |

13. **Pyramid Step** (up then down)
    \| 100 | 60s | 120s | 60s |
    \| 200 | 60s | 120s | 60s |
    \| 300 | 60s | 120s | 60s |
    \| 200 | 60s | 120s | 60s |
    \| 100 | 60s | 120s | 60s |

14. **Tiny Steps** (20 users every 2 min)
    Rows of 20 → 200 total.

15. **Big Steps** (500 → 1000 → 2000)

16. **Mixed Steps** (100 + 50 + 200 + 150)

17. **Rolling Step** (like ladder climbing)

18. **Wave Step** (repeat ups and downs)

19. **Step with Long Holds** (simulate slow buildup)

20. **Step with Short Holds** (quick experiments)

---

## 🔹 21–30: Stress & Spike

21. **Single Spike** – 1000 users instantly.
22. **Double Spike** – 2 spikes separated by idle time.
23. **Spike with Base Load** – 100 users baseline + 500 users spike.
24. **Rapid Spike** – 2000 users in 5s.
25. **Spike Storm** – multiple spikes every 5 min.
26. **Ramp + Spike** – climb 500 users then sudden 1500 spike.
27. **Long Spike** – spike lasts 1h.
28. **Short Spike** – spike lasts 30s.
29. **Cascading Spikes** – 500 → 1000 → 2000 → 4000.
30. **Recovery Spike** – spike then ramp-down slow to measure recovery.

---

## 🔹 31–40: Soak & Endurance

31. **2h Soak** – 200 users 2h.
32. **6h Soak** – 300 users 6h.
33. **12h Soak** – 100 users 12h.
34. **24h Soak** – 50 users all day.
35. **Weekend Soak** – 100 users 48h.
36. **Background 24h + Foreground 2h burst**
37. **Memory Leak Check** – 50 users 8h.
38. **CPU Burn** – 1000 users 4h.
39. **Database Saturation** – steady 200 users for 6h.
40. **Endurance + Spikes** – long baseline + occasional spikes.

---

## 🔹 41–50: Realistic / Hybrid

41. **Morning Ramp** – 0→300 users in 1h, hold 2h, down.
42. **Lunch Peak** – 200→1000 in 5m, hold 15m.
43. **Evening Dip** – 500→100 in 30m.
44. **Weekend Festival** – 0→2000 in 2h, hold 12h.
45. **Wave Traffic** – repeated rise/fall cycles every 30m.
46. **Black Friday Test** – 100 base + 5000 surge.
47. **Failover Test** – 2000 users constant, simulate node crash.
48. **Background + Mobile Users** – 100 web + 50 mobile with different ramps.
49. **API Storm (Thundering Herd)** – 5000 users instantly, short hold.
50. **Mixed Scenario** – baseline + periodic steps + occasional spikes (everything combined).

---

# ✅ Summary

* With **UTG**, you can do **all 50 scenarios** (and more).
* Each scenario is just a different **row configuration** in the UTG table.
* If you want **isolation between scenarios**, either:

  * Align timings (no overlap), OR
  * Split into multiple UTGs in one test plan.

---

👉 Do you want me to make this into a **downloadable PDF/Excel “cookbook” with all 50 UTG tables ready** so you can use it directly in projects?
