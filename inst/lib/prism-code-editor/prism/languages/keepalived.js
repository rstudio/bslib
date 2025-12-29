import { l as languages } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
languages.keepalived = {
  "comment": /[#!].*/,
  "string": {
    pattern: /(^|[^\\])(["'])(?:\\[^]|(?!\2)[^\\\n])*\2/g,
    lookbehind: true,
    greedy: true
  },
  // support IPv4, IPv6, subnet mask
  "ip": {
    pattern: re(
      "\\b(?:(?:(?:[a-f\\d]{1,4}:){7}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){6}:[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){5}:(?:[a-f\\d]{1,4}:)?[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){4}:(?:[a-f\\d]{1,4}:){0,2}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){3}:(?:[a-f\\d]{1,4}:){0,3}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){2}:(?:[a-f\\d]{1,4}:){0,4}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){6}<0>|(?:[a-f\\d]{1,4}:){0,5}:<0>|::(?:[a-f\\d]{1,4}:){0,5}<0>|[a-f\\d]{1,4}::(?:[a-f\\d]{1,4}:){0,5}[a-f\\d]{1,4}|::(?:[a-f\\d]{1,4}:){0,6}[a-f\\d]{1,4}|(?:[a-f\\d]{1,4}:){1,7}:)(?:/\\d{1,3})?|<0>(?:/\\d\\d?)?)\\b",
      ["(?:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d))"],
      "i"
    ),
    alias: "number"
  },
  // support *nix / Windows, directory / file
  "path": {
    pattern: /(\s)\/(?:[^\s/]+\/)*[^\s/]*|\b[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*/,
    lookbehind: true,
    alias: "string"
  },
  "variable": /\$\{?\w+\}?/,
  "email": {
    pattern: /[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}/,
    alias: "string"
  },
  "conditional-configuration": {
    pattern: /@\^?[\w-]+/,
    alias: "variable"
  },
  "operator": /=/,
  "property": /\b(?:BFD_CHECK|DNS_CHECK|FILE_CHECK|HTTP_GET|MISC_CHECK|NAME|PING_CHECK|SCRIPTS|SMTP_CHECK|SSL|SSL_GET|TCP_CHECK|UDP_CHECK|accept|advert_int|alpha|auth_pass|auth_type|authentication|bfd_cpu_affinity|bfd_instance|bfd_no_swap|bfd_priority|bfd_process_name|bfd_rlimit_rttime|bfd_rt_priority|bind_if|bind_port|bindto|ca|certificate|check_unicast_src|checker|checker_(?:|cpu_affinity|log_all_failures|no_swap|priority|rlimit_rttime|rt_priority)|child_wait_time|connect_ip|connect_port|connect_timeout|dbus_service_name|debug|default_interface|delay|delay_before_retry|delay_loop|digest|dont_track_primary|dynamic|dynamic_interfaces|enable_(?:dbus|script_security|sni|snmp_checker|snmp_rfc|snmp_rfcv[23]|snmp_vrrp|traps)|end|fall|fast_recovery|file|flag-[123]|fork_delay|full_command|fwmark|garp_(?:group|interval|lower_prio_delay|lower_prio_repeat|master_delay|master_refresh|master_refresh_repeat|master_repeat)|global_defs|global_tracking|gna_interval|group|ha_suspend|hashed|helo_name|higher_prio_send_advert|hoplimit|http_protocol|hysteresis|idle_tx|include|inhibit_on_failure|init_fail|init_file|instance|interfaces?|interval|ip_family|ipvs_process_name|keepalived.conf|kernel_rx_buf_size|key|linkbeat_interfaces|linkbeat_use_polling|log_all_failures|log_unknown_vrids|lower_prio_no_advert|lthreshold|lvs_(?:flush|flush_onstop|method|netlink_cmd_rcv_bufs|netlink_cmd_rcv_bufs_force|netlink_monitor_rcv_bufs|netlink_monitor_rcv_bufs_force|notify_fifo|notify_fifo_script|sched|sync_daemon)|max_auto_priority|max_hops|mcast_src_ip|mh-fallback|mh-port|min_auto_priority_delay|min_rx|min_tx|misc_dynamic|misc_path|misc_timeout|multiplier|name|namespace_with_ipsets|native_ipv6|neighbor_ip|net_namespace|net_namespace_ipvs|nftables|nftables_counters|nftables_ifindex|nftables_priority|no_accept|no_checker_emails|no_email_faults|nopreempt|notif(?:ication_email|ication_email_from|y|y_backup|y_deleted|y_down|y_fault|y_fifo|y_fifo_script|y_master|y_master_rx_lower_pri|y_priority_changes|y_stop|y_up)|old_unicast_checksum|omega|ops|param_match|passive|password|path|persistence_(?:engine|granularity|timeout)|preempt|preempt_delay|priority|process|process_monitor_rcv_bufs|process_monitor_rcv_bufs_force|process_names?|promote_secondaries|protocol|proxy_arp|proxy_arp_pvlan|quorum|quorum_down|quorum_max|quorum_up|random_seed|real_server|regex|regex_(?:max_offset|min_offset|no_match|options|stack)|reload_repeat|reload_time_file|require_reply|retry|rise|router_id|rs_init_notifies|script|script_user|sh-fallback|sh-port|shutdown_script|shutdown_script_timeout|skip_check_adv_addr|smtp_alert|smtp_alert_checker|smtp_alert_vrrp|smtp_connect_timeout|smtp_helo_name|smtp_server|snmp_socket|sorry_server|sorry_server_inhibit|sorry_server_lvs_method|source_ip|start|startup_script|startup_script_timeout|state|static_ipaddress|static_routes|static_rules|status_code|step|strict_mode|sync_group_tracking_weight|terminate_delay|timeout|track_(?:bfd|file|group|interface|process|script|src_ip)|ttl|type|umask|unicast_peer|unicast_src_ip|unicast_ttl|url|use_ipvlan|use_pid_dir|use_vmac|user|uthreshold|val[123]|version|virtual_(?:ipaddress|ipaddress_excluded|router_id|routes|rules|server|server_group)|virtualhost|vmac_xmit_base|vrrp|vrrp_(?:check_unicast_src|cpu_affinity|garp_(?:interval|lower_prio_delay|lower_prio_repeat|master_delay|master_refresh|master_refresh_repeat|master_repeat)|gna_interval|higher_prio_send_advert|instance|ipsets|iptables|lower_prio_no_advert|mcast_group[46]|min_garp|netlink_cmd_rcv_bufs|netlink_cmd_rcv_bufs_force|netlink_monitor_rcv_bufs|netlink_monitor_rcv_bufs_force|no_swap|notify_fifo|notify_fifo_script|notify_priority_changes|priority|process_name|rlimit_rttime|rt_priority|rx_bufs_multiplier|rx_bufs_policy|script|skip_check_adv_addr|startup_delay|strict|sync_group|track_process|version)|warmup|weight)\b/,
  "constant": /\b(?:A|AAAA|AH|BACKUP|CNAME|DR|MASTER|MX|NAT|NS|PASS|SCTP|SOA|TCP|TUN|TXT|UDP|dh|fo|lblcr?|mh|nq|ovf|sed|sh|w?lc|w?rr)\b/,
  "number": {
    pattern: /(^|[^\w.-])-?\d+(?:\.\d+)?/,
    lookbehind: true
  },
  "boolean": /\b(?:false|true|no|off|on|yes)\b/,
  "punctuation": /[{}]/
};
//# sourceMappingURL=keepalived.js.map
