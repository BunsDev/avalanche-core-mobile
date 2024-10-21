echo "This is the build number: $BUILD_NUMBER"

curl -X PUT \
  https://api.datadoghq.com/api/v1/dashboard/ipu-tbk-spn \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -H "Cache-Control: no-cache"  \
  -d @- << EOF
  {
  "title": "iOS Mobile Performance Dashboard",
  "description": "Performance metrics for Core iOS",
  "widgets": [
    {
      "id": 3605593076802110,
      "definition": {
        "title": "Overall Performance",
        "background_color": "gray",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 2878325580401984,
            "definition": {
              "title": " App Startup Time",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query2",
                      "number_format": {
                        "unit": {
                          "type": "canonical_unit",
                          "unit_name": "nanosecond"
                        }
                      }
                    }
                  ],
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "group_by": [],
                      "search": {
                        "query": "@type:action @action.type:application_start @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user"
                      }
                    }
                  ],
                  "conditional_formats": [
                    {
                      "palette": "black_on_light_red",
                      "value": 5000000000,
                      "comparator": ">"
                    },
                    {
                      "palette": "black_on_light_yellow",
                      "value": 4500000000,
                      "comparator": ">"
                    },
                    {
                      "palette": "black_on_light_green",
                      "value": 4000000000,
                      "comparator": "<="
                    }
                  ],
                  "response_format": "scalar"
                }
              ],
              "autoscale": true,
              "precision": 2,
              "timeseries_background": {
                "yaxis": {
                  "include_zero": false
                },
                "type": "area"
              }
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 6199483159313698,
            "definition": {
              "title": "Refresh Rate",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query2"
                    }
                  ],
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@view.refresh_rate_average"
                      },
                      "group_by": [],
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user"
                      }
                    }
                  ],
                  "conditional_formats": [
                    {
                      "palette": "black_on_light_red",
                      "value": 39,
                      "comparator": "<"
                    },
                    {
                      "palette": "black_on_light_yellow",
                      "value": 50,
                      "comparator": "<"
                    },
                    {
                      "palette": "black_on_light_green",
                      "value": 50,
                      "comparator": ">="
                    }
                  ],
                  "response_format": "scalar"
                }
              ],
              "autoscale": true,
              "precision": 2,
              "timeseries_background": {
                "yaxis": {
                  "include_zero": false
                },
                "type": "area"
              }
            },
            "layout": {
              "x": 3,
              "y": 0,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 8096566132414896,
            "definition": {
              "title": "Crash free Sessions",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@session.id"
                      },
                      "group_by": [],
                      "search": {
                        "query": "@session.crash.count:>0 @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @type:session"
                      }
                    },
                    {
                      "data_source": "rum",
                      "name": "query1",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@session.id"
                      },
                      "group_by": [],
                      "search": {
                        "query": "@application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @type:session"
                      }
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "(1 - query2 / query1) * 100"
                    }
                  ],
                  "conditional_formats": [
                    {
                      "comparator": "<",
                      "palette": "black_on_light_red",
                      "value": 98
                    },
                    {
                      "comparator": "<",
                      "palette": "black_on_light_yellow",
                      "value": 99.8
                    },
                    {
                      "comparator": "<=",
                      "palette": "black_on_light_green",
                      "value": 100
                    }
                  ]
                }
              ],
              "autoscale": true,
              "custom_unit": "%",
              "precision": 2,
              "timeseries_background": {
                "type": "area",
                "yaxis": {
                  "include_zero": false
                }
              }
            },
            "layout": {
              "x": 6,
              "y": 0,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 6590797298281856,
            "definition": {
              "title": "Memory Average",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query2"
                    }
                  ],
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@view.memory_average"
                      },
                      "group_by": [],
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user"
                      }
                    }
                  ],
                  "conditional_formats": [
                    {
                      "palette": "black_on_light_red",
                      "value": 39,
                      "comparator": "<"
                    },
                    {
                      "palette": "black_on_light_yellow",
                      "value": 50,
                      "comparator": "<"
                    },
                    {
                      "palette": "black_on_light_green",
                      "value": 50,
                      "comparator": ">="
                    }
                  ],
                  "response_format": "scalar"
                }
              ],
              "autoscale": true,
              "precision": 2,
              "timeseries_background": {
                "yaxis": {
                  "include_zero": false
                },
                "type": "area"
              }
            },
            "layout": {
              "x": 9,
              "y": 0,
              "width": 3,
              "height": 2
            }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 0,
        "width": 12,
        "height": 3
      }
    },
    {
      "id": 1416264083016910,
      "definition": {
        "title": "Views Performance",
        "background_color": "vivid_green",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 8608921316943666,
            "definition": {
              "title": "iOS Views with the most frozen frames",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "conditional_formats": [
                    {
                      "comparator": ">",
                      "palette": "white_on_red",
                      "value": 0
                    }
                  ],
                  "response_format": "scalar",
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query1",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 10,
                          "sort": {
                            "order": "desc",
                            "aggregation": "cardinality",
                            "metric": "@view.id"
                          }
                        }
                      ],
                      "search": {
                        "query": "@type:view @session.type:user @view.frozen_frame.count:>0 @application.name:\"Core Mobile\""
                      }
                    },
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 10,
                          "sort": {
                            "order": "desc",
                            "aggregation": "cardinality",
                            "metric": "@view.id"
                          }
                        }
                      ],
                      "search": {
                        "query": "@type:view @session.type:user @application.name:\"Core Mobile\" @os.name:iOS"
                      }
                    }
                  ],
                  "formulas": [
                    {
                      "alias": "% of Views with Frozen Frames",
                      "formula": "100 * (query1 / query2)"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ],
              "style": {}
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 9,
              "height": 2
            }
          },
          {
            "id": 6294409523896582,
            "definition": {
              "type": "note",
              "content": "### Frozen frames ###\n\nFrames that take longer than `700ms` to render appear as stuck and unresponsive in your application. These are classified as frozen frames.\n",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": {
              "x": 9,
              "y": 0,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 527550427816688,
            "definition": {
              "title": "iOS views with the highest percentage of slow renders",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "data_source": "rum",
                      "name": "query1",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 10,
                          "sort": {
                            "order": "desc",
                            "aggregation": "cardinality",
                            "metric": "@view.id"
                          }
                        }
                      ],
                      "search": {
                        "query": "@type:view @session.type:user @application.name:\"Core Mobile\" @view.is_slow_rendered:true"
                      }
                    },
                    {
                      "data_source": "rum",
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 10,
                          "sort": {
                            "order": "desc",
                            "aggregation": "cardinality",
                            "metric": "@view.id"
                          }
                        }
                      ],
                      "search": {
                        "query": "@type:view @session.type:user @application.name:\"Core Mobile\" @os.name:iOS"
                      }
                    }
                  ],
                  "formulas": [
                    {
                      "alias": "% of Views with Slow Renders",
                      "formula": "100 * (query1 / query2)"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ],
              "style": {}
            },
            "layout": {
              "x": 0,
              "y": 2,
              "width": 9,
              "height": 2
            }
          },
          {
            "id": 5942947520026884,
            "definition": {
              "type": "note",
              "content": "### Slow renders ###\n\nWith slow renders data, you can monitor which views are taking longer than `16ms` or `60Hz` to render.\n\n**Note:** Refresh rates are normalized on a range of zero to 60fps. ",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": {
              "x": 9,
              "y": 2,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 7403012191699538,
            "definition": {
              "title": "iOS Long Task Duration by View Name",
              "type": "treemap",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:long_task @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 10,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@long_task.duration"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@long_task.duration"
                      },
                      "storage": "hot"
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ]
            },
            "layout": {
              "x": 0,
              "y": 4,
              "width": 12,
              "height": 3
            }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 3,
        "width": 12,
        "height": 8
      }
    },
    {
      "id": 5414966588799072,
      "definition": {
        "title": "Errors",
        "background_color": "orange",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 6860145306777690,
            "definition": {
              "title": "Top Screens with Crashes",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "conditional_formats": [
                    {
                      "palette": "white_on_red",
                      "value": 0,
                      "comparator": ">"
                    }
                  ],
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 250,
                          "sort": {
                            "aggregation": "count",
                            "order": "desc",
                            "metric": "count"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "count",
                        "metric": "count",
                        "interval": 3600000
                      },
                      "storage": "hot"
                    },
                    {
                      "search": {
                        "query": "@view.crash.count:>0 @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @type:view"
                      },
                      "data_source": "rum",
                      "compute": {
                        "interval": 3600000,
                        "aggregation": "count"
                      },
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "sort": {
                            "aggregation": "count",
                            "order": "desc"
                          },
                          "limit": 250
                        }
                      ]
                    }
                  ],
                  "formulas": [
                    {
                      "alias": "% of Views with Errors",
                      "formula": "(1 - (query1 - query2) / query1) * 100"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ],
              "style": {}
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 3,
              "height": 2
            }
          },
          {
            "id": 2955469739865264,
            "definition": {
              "title": "Top Screens with Errors",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "conditional_formats": [
                    {
                      "palette": "white_on_red",
                      "value": 0,
                      "comparator": ">"
                    }
                  ],
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "limit": 250,
                          "sort": {
                            "aggregation": "count",
                            "order": "desc",
                            "metric": "count"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "count",
                        "metric": "count",
                        "interval": 3600000
                      },
                      "storage": "hot"
                    },
                    {
                      "search": {
                        "query": "@view.error.count:>0 @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @type:view"
                      },
                      "data_source": "rum",
                      "compute": {
                        "interval": 3600000,
                        "aggregation": "count"
                      },
                      "name": "query2",
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@view.name",
                          "sort": {
                            "aggregation": "count",
                            "order": "desc"
                          },
                          "limit": 250
                        }
                      ]
                    }
                  ],
                  "formulas": [
                    {
                      "alias": "% of Views with Errors",
                      "formula": "(1 - (query1 - query2) / query1) * 100"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ],
              "style": {}
            },
            "layout": {
              "x": 3,
              "y": 0,
              "width": 3,
              "height": 2
            }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 0,
        "width": 6,
        "height": 3
      }
    },
    {
      "id": 1610846052592692,
      "definition": {
        "title": "Latest Version Average Application Start(Update with script)",
        "background_color": "yellow",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 7849781516593068,
            "definition": {
              "title": "org.avalabs.avaxwallet.internal",
              "type": "treemap",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:action @session.type:user @action.type:application_start @application.name:\"Core Mobile\" -version:<$BUILD_NUMBER service:org.avalabs.avaxwallet.internal"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "storage": "hot"
                    }
                  ],
                  "response_format": "scalar",
                  "style": {
                    "palette": "datadog16"
                  }
                }
              ]
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 6,
              "height": 2
            }
          }
        ]
      },
      "layout": {
        "x": 6,
        "y": 0,
        "width": 6,
        "height": 3
      }
    },
    {
      "id": 8788703574782134,
      "definition": {
        "title": "Latest Release Performance",
        "background_color": "blue",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 7860422761109870,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS application start time by version(Update with script)",
              "type": "treemap",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:action @session.type:user @action.type:application_start @application.name:\"Core Mobile\""
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "pc90",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "pc90",
                        "metric": "@action.loading_time"
                      },
                      "storage": "hot"
                    }
                  ],
                  "response_format": "scalar",
                  "style": {
                    "palette": "datadog16"
                  }
                }
              ]
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 12,
              "height": 3
            }
          },
          {
            "id": 2091766263734094,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS Refresh Rate by version(Update with script and set alert if refresh rate drops below threshold)",
              "type": "treemap",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ],
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "median",
                            "order": "desc",
                            "metric": "@view.refresh_rate_average"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "median",
                        "metric": "@view.refresh_rate_average"
                      },
                      "storage": "hot"
                    }
                  ],
                  "response_format": "scalar",
                  "style": {
                    "palette": "datadog16"
                  }
                }
              ]
            },
            "layout": {
              "x": 0,
              "y": 3,
              "width": 6,
              "height": 3
            }
          },
          {
            "id": 4935670314411118,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS Memory Consumption by version(Update with script and set alert if memory consumption goes above specific level)",
              "type": "treemap",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ],
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:view @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@view.memory_average"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@view.memory_average"
                      },
                      "storage": "hot"
                    }
                  ],
                  "response_format": "scalar",
                  "style": {
                    "palette": "datadog16"
                  }
                }
              ]
            },
            "layout": {
              "x": 6,
              "y": 3,
              "width": 6,
              "height": 3
            }
          },
          {
            "id": 1105689629788846,
            "definition": {
              "title": "% of frozen frames by version(Update with script)",
              "title_size": "16",
              "title_align": "left",
              "time": {
                "hide_incomplete_cost_data": true
              },
              "type": "query_table",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:view @view.frozen_frame.count:>0 @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "cardinality",
                            "order": "desc",
                            "metric": "@view.id"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "storage": "hot"
                    },
                    {
                      "data_source": "rum",
                      "compute": {
                        "aggregation": "cardinality",
                        "metric": "@view.id"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "metric": "@view.id",
                            "order": "desc",
                            "aggregation": "cardinality"
                          }
                        }
                      ],
                      "name": "query2",
                      "search": {
                        "query": "@application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @type:view"
                      }
                    }
                  ],
                  "response_format": "scalar",
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  },
                  "formulas": [
                    {
                      "cell_display_mode": "bar",
                      "formula": "100 * (query1 / query2)"
                    }
                  ]
                }
              ],
              "has_search_bar": "auto"
            },
            "layout": {
              "x": 0,
              "y": 6,
              "width": 4,
              "height": 2
            }
          },
          {
            "id": 4466470907554154,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS average action loading time for release build(Update with script)",
              "type": "treemap",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:action @device.type:Mobile -@action.type:(click OR tap) version:(3499 OR 3491) @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "storage": "hot"
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ]
                }
              ]
            },
            "layout": {
              "x": 4,
              "y": 6,
              "width": 4,
              "height": 2
            }
          },
          {
            "id": 7994506763556888,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS average action loading time for latest internal build(Update with script)",
              "type": "treemap",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:action @device.type:Mobile -@action.type:(click OR tap) version:(3499 OR 3491) @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "storage": "hot"
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ]
                }
              ]
            },
            "layout": {
              "x": 8,
              "y": 6,
              "width": 4,
              "height": 2
            }
          },
          {
            "id": 4656190487528324,
            "definition": {
              "title": "iOS Errors by version(Set alert if number of errors significantly increase)",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": [
                "avg",
                "min",
                "max",
                "value",
                "sum"
              ],
              "time": {
                "hide_incomplete_cost_data": true
              },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "rum",
                      "search": {
                        "query": "@type:error @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "version",
                          "limit": 10,
                          "sort": {
                            "aggregation": "count",
                            "order": "desc",
                            "metric": "count"
                          },
                          "should_exclude_missing": true
                        }
                      ],
                      "compute": {
                        "aggregation": "count",
                        "metric": "count"
                      },
                      "storage": "hot"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "red",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "bars"
                }
              ],
              "yaxis": {
                "scale": "linear",
                "label": "",
                "include_zero": true,
                "min": "auto",
                "max": "auto"
              },
              "markers": []
            },
            "layout": {
              "x": 0,
              "y": 8,
              "width": 4,
              "height": 2
            }
          },
          {
            "id": 3077574839378720,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS Latest Release Build Action Loading time by Action Type(Update with script)",
              "type": "treemap",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "search": {
                        "query": "@type:action @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @action.type:tap @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@action.name",
                          "limit": 10,
                          "should_exclude_missing": true,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          }
                        }
                      ],
                      "storage": "hot"
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ]
            },
            "layout": {
              "x": 4,
              "y": 8,
              "width": 4,
              "height": 2
            }
          },
          {
            "id": 23574404906818,
            "definition": {
              "time": {
                "hide_incomplete_cost_data": true
              },
              "title": "iOS Latest Internal Build Action Loading time by Action Type(Update with script)",
              "type": "treemap",
              "requests": [
                {
                  "response_format": "scalar",
                  "queries": [
                    {
                      "name": "a",
                      "data_source": "rum",
                      "compute": {
                        "aggregation": "avg",
                        "metric": "@action.loading_time"
                      },
                      "search": {
                        "query": "@type:action @application.id:4deaf0a2-6489-4a26-b05c-deb1f3673bbb @session.type:user @action.type:tap @os.name:iOS"
                      },
                      "indexes": [
                        "*"
                      ],
                      "group_by": [
                        {
                          "facet": "@action.name",
                          "limit": 10,
                          "should_exclude_missing": true,
                          "sort": {
                            "aggregation": "avg",
                            "order": "desc",
                            "metric": "@action.loading_time"
                          }
                        }
                      ],
                      "storage": "hot"
                    }
                  ],
                  "formulas": [
                    {
                      "formula": "a"
                    }
                  ],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      {
                        "type": "formula",
                        "index": 0,
                        "order": "desc"
                      }
                    ]
                  }
                }
              ]
            },
            "layout": {
              "x": 8,
              "y": 8,
              "width": 4,
              "height": 2
            }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 14,
        "width": 12,
        "height": 11,
        "is_column_break": true
      }
    }
  ],
  "template_variables": [
    {
      "name": "env",
      "prefix": "env",
      "available_values": [
        "development"
      ],
      "default": "development"
    },
    {
      "name": "device",
      "prefix": "@os.name",
      "available_values": [],
      "default": "*"
    },
    {
      "name": "version",
      "prefix": "@version",
      "available_values": [],
      "default": "*"
    }
  ],
  "layout_type": "ordered",
  "notify_list": [],
  "reflow_type": "fixed"
}
EOF
  